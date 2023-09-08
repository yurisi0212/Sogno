<?php

namespace App\Interfaces;

interface DreamRepositoryInterface {
    public function getDreamsOfSpecifiedLimit($offset, $limit = 20);

    public function store($id, $validated);
}
