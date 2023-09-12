<?php

namespace App\Interfaces;

interface SearchHistoryRepositoryInterface{

    public function store($user_id, $keyword);

    public function getLatest($user_id, $limit = 5);

    public function search($keyword);
}
