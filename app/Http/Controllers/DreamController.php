<?php

namespace App\Http\Controllers;

use App\Http\Requests\DreamStoreRequest;
use App\Models\Dream;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;

class DreamController extends Controller {

    public function store(DreamStoreRequest $request): RedirectResponse {
        $validated = $request->validated();

        $dream = new Dream();
        $dream->fill($validated);
        $dream->save();

        return back()->with('message_success' , '新しい夢を投稿しました');
    }

    public function ajaxGetDreams(Request $request): array {
        $offset = $request->input("offset");
        $offset = $offset ?? 0;
        $dreams = Dream::query()
            ->limit(20)
            ->offset($offset)
            ->orderByDesc('updated_at')
            ->select("title", "content", "updated_at")
            ->get();

        return $dreams->toArray();
    }

}
