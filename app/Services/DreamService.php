<?php

namespace App\Services;

use App\Exceptions\CantSaveDreamException;
use App\Repositories\DreamRepository;
use Illuminate\Database\Eloquent\Collection;

class DreamService {

    public function __construct(private readonly DreamRepository $dreamRepository) {
    }

    /**
     * @throws CantSaveDreamException
     */
    public function store($id, $validated): void {
        $this->dreamRepository->store($id, $validated);
    }

    public function getDreams($offset, $limit = 20): Collection|array {
        return $this->dreamRepository->getDreamsOfSpecifiedLimit($offset, $limit);
    }
}
