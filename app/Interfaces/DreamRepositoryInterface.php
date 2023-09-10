<?php

namespace App\Interfaces;

interface DreamRepositoryInterface {
    public function store($id, $validated);

    public function getDreamsOfSpecifiedLimit($offset, $limit = 20);
}
