<?php

namespace App\Repositories;

use App\Exceptions\CantSaveUserException;
use App\Interfaces\UserRepositoryInterface;
use App\Models\User;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;

class UserRepository implements UserRepositoryInterface {

    /**
     * @param $id
     * @return Model|Collection|Builder|array|null
     */
    public function getUserWithProfile($id): Model|Collection|Builder|array|null {
        return User::query()
            ->select('id', 'name')
            ->with('profile')
            ->findOrFail($id);
    }

    /**
     * @param $id
     * @return Model|Collection|Builder|array|null
     */
    public function find($id): Model|Collection|Builder|array|null {
        return User::query()->find($id);
    }

    /**
     * @param $id
     * @param $validated
     * @return void
     * @throws CantSaveUserException
     */
    public function update($id, $validated): void {
        $user = $this->find($id);
        $user->fill($validated);
        if ($user->isDirty('email')) {
            $user->email_verified_at = null;
        }
        if (!$user->save()) {
            throw new CantSaveUserException("ユーザーの保存に失敗しました。");
        }
    }

    public function delete($id): void {
        $user = $this->find($id);
        $user->delete();
    }
}
