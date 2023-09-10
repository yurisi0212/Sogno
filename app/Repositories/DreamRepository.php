<?php

namespace App\Repositories;

use App\Exceptions\CantSaveDreamException;
use App\Interfaces\DreamRepositoryInterface;
use App\Models\Dream;
use Illuminate\Database\Eloquent\Collection;

class DreamRepository implements DreamRepositoryInterface {

    /**
     * @param $id
     * @param $validated
     * @return void
     * @throws CantSaveDreamException
     */
    public function store($id, $validated): void {
        $dream = new Dream();
        $dream->fill($validated);
        $dream->user_id = $id;
        if (!$dream->save()) {
            throw new CantSaveDreamException("保存に失敗しました。");
        }
    }

    /**
     * @param $offset
     * @param $limit
     * @return Collection|array
     */
    public function getDreamsOfSpecifiedLimit($offset, $limit = 20): Collection|array {
        return Dream::query()
            ->with('user')
            ->limit($limit)
            ->offset($offset)
            ->orderByDesc('updated_at')
            ->select("title", "content", "updated_at")
            ->get();
    }

}
