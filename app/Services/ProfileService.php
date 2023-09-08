<?php

namespace App\Services;

use App\Exceptions\CantSaveProfileException;
use App\Repositories\ProfileRepository;

class ProfileService{

    public function __construct(private ProfileRepository $profileRepository) {
    }

    /**
     * @throws CantSaveProfileException
     */
    public function update($user_id, $validated): void {
        $this->profileRepository->update($user_id, $validated);
    }
}
