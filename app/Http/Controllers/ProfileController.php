<?php

namespace App\Http\Controllers;

use App\Exceptions\CantSaveProfileException;
use App\Exceptions\CantSaveUserException;
use App\Http\Requests\ProfileUpdateRequest;
use App\Services\ProfileService;
use App\Services\UserService;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Inertia\Response;

class ProfileController extends Controller {

    public function __construct(
        private readonly UserService    $userService,
        private readonly ProfileService $profileService
    ) {
    }


    /**
     * @param $id
     * @return Response
     */
    public function show($id): Response {
        return Inertia::render('Profile/Show', [
            'mustVerifyEmail' => Auth::user() instanceof MustVerifyEmail,
            'status' => session('status'),
            'user' => $this->userService->getUserWithProfile($id),
        ]);
    }


    /**
     * Display the user's profile form.
     * @param Request $request
     * @return Response
     */
    public function edit(Request $request): Response {
        return Inertia::render('Profile/Edit', [
            'mustVerifyEmail' => $request->user() instanceof MustVerifyEmail,
            'status' => session('status'),
            'user' => $this->userService->getUserWithProfile(Auth::id()),
        ]);
    }

    /**
     * Update the user's profile information.
     */
    public function update(ProfileUpdateRequest $request): RedirectResponse {
        $validated = $request->validated();
        $id = Auth::id();
        try {
            $this->userService->update($id, $validated);
            $this->profileService->update($id, $validated);
        } catch (CantSaveUserException $e) {
            logs()->error($e);
            return Redirect::route('auth.profile.edit')->with('message_error', 'ユーザー情報の更新に失敗しました。');
        } catch (CantSaveProfileException $e) {
            logs()->error($e);
            return Redirect::route('auth.profile.edit')->with('message_error', 'プロフィールの更新に失敗しました。');
        }

        return Redirect::route('auth.profile.edit')->with('message_success', 'プロフィールを変更しました。');
    }

    /**
     * Delete the user's account.
     */
    public function destroy(Request $request): RedirectResponse {
        $request->validate([
            'password' => ['required', 'current_password'],
        ]);

        $id = Auth::id();

        Auth::logout();

        $this->userService->deleteUser($id);

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return Redirect::to('/');
    }
}
