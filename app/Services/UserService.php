<?php

namespace App\Services;

use App\Exceptions\CantSaveUserException;
use App\Models\User;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;

class UserService {

    public function getUserWithProfile($id): Model|Collection|Builder|array|null {
        return User::query()
            ->select('id', 'name')
            ->with('profile')
            ->findOrFail($id);
    }

    /**
     * @throws CantSaveUserException
     */
    public function saveUser($id, $validated): void {
        $user = User::query()->find($id);
        $user->fill($validated);
        if ($user->isDirty('email')) {
            $user->email_verified_at = null;
        }
        if (!$user->save()) {
            throw new CantSaveUserException("ユーザーの保存に失敗しました。");
        }
    }

    public function deleteUser($user){
        $user->delete();
    }
}
