<?php

namespace App\Repositories;

use App\Interfaces\SearchHistoryRepositoryInterface;
use App\Models\SearchHistory;

class SearchHistoryRepository implements SearchHistoryRepositoryInterface {

    public function getLatest($user_id, $limit = 5) {
        return SearchHistory::query()
            ->select('id', 'user_id', 'text')
            ->where("user_id", $user_id)
            ->latest('id')
            ->limit($limit)
            ->get();
    }

    public function store($user_id, $keyword) {
        $keyword = mb_substr($keyword, 0, 50);
        $history = new SearchHistory();
        $history->user_id = $user_id;
        $history->text = $keyword;
        $history->save();
    }

    public function search($keyword){
        $keyword = extractKeywords($keyword);
        $result = [];
    }
}
