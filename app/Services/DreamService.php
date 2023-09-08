<?php

namespace App\Services;

use App\Exceptions\CantSaveDreamException;
use App\Models\Dream;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Support\Facades\Auth;

class DreamService {

    /**
     * @throws CantSaveDreamException
     */
    public function addNewDream($validated): void {
        $dream = new Dream();
        $dream->fill($validated);
        $dream->user_id = Auth::id();
        if (!$dream->save()) {
            throw new CantSaveDreamException("保存に失敗しました。");
        }
    }

    public function getDreams($offset, $limit = 20): Collection|array {
        return Dream::query()
            ->limit($limit)
            ->offset($offset)
            ->orderByDesc('updated_at')
            ->select("title", "content", "updated_at")
            ->get();
    }
}
