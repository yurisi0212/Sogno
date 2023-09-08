<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProfileUpdateRequest;
use App\Models\User;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Inertia\Response;

class ProfileController extends Controller {


    /**
     * @param $id
     * @return Response
     */
    public function show($id): Response {
        return Inertia::render('Profile/Show',[
            'mustVerifyEmail' => Auth::user() instanceof MustVerifyEmail,
            'status' => session('status'),
            'user' => User::query()
                ->select('id', 'name')
                ->with('profile')
                ->findOrFail($id),
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
            'user' => User::query()->with('profile')->where('id', Auth::id())->first(),
        ]);
    }

    /**
     * Update the user's profile information.
     */
    public function update(ProfileUpdateRequest $request): RedirectResponse {
        $request->user()->fill($request->validated());
        $request->user()->profile->fill($request->validated());
        if ($request->user()->isDirty('email')) {
            $request->user()->email_verified_at = null;
        }

        if(!$request->user()->save()){
            return Redirect::route('auth.profile.edit')->with('message_error', '名前の更新に失敗しました。');
        }

        if(!$request->user()->profile->save()){
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

        $user = $request->user();

        Auth::logout();

        $user->delete();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return Redirect::to('/');
    }
}
