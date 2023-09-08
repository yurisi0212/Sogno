<?php

namespace App\Services;

use App\Exceptions\CantSaveUserException;
use App\Repositories\UserRepository;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;

class UserService {

    public function __construct(private readonly UserRepository $userRepository) {
    }

    public function getUserWithProfile($id): Model|Collection|Builder|array|null {
        return $this->userRepository->getUserWithProfile($id);
    }

    /**
     * @throws CantSaveUserException
     */
    public function update($id, $validated): void {
        $this->userRepository->update($id, $validated);
    }

    /**
     * @param $id
     * @return void
     */
    public function deleteUser($id): void {
        $this->userRepository->delete($id);
    }
}
