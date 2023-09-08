<?php

namespace App\Http\Controllers;

use App\Exceptions\CantSaveDreamException;
use App\Http\Requests\DreamStoreRequest;
use App\Services\DreamService;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class DreamController extends Controller {

    public function __construct(private readonly DreamService $dreamService) {
    }

    public function store(DreamStoreRequest $request): RedirectResponse {
        $validated = $request->validated();
        try {
            $this->dreamService->store(Auth::id(), $validated);
        } catch (CantSaveDreamException $e) {
            logs()->error($e);
            return back()->with('message_success', '夢の投稿に失敗しました');
        }

        return back()->with('message_success', '新しい夢を投稿しました');
    }

    public function ajaxGetDreams(Request $request): array {
        $offset = $request->input("offset");
        $offset = $offset ?? 0;
        $dreams = $this->dreamService->getDreams($offset);

        return $dreams->toArray();
    }

}
