<?php

namespace App\Services;

use App\Repositories\DreamRepository;
use App\Repositories\SearchHistoryRepository;
use App\Repositories\UserRepository;

class SearchService{

    public function __construct(
        private SearchHistoryRepository $historyRepository,
        private UserRepository $userRepository,
        private DreamRepository $dreamRepository,
    ) {
    }

    public function getSearchHistories($user_id){
        return $this->historyRepository->getLatest($user_id);
    }

    public function getSearchResult($user_id, $keyword){

    }

    public function registerSearchHistory($user_id, $keyword){
        $this->historyRepository->store($user_id, $keyword);
    }
}
