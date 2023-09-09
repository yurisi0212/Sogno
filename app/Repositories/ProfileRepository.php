<?php

namespace App\Repositories;

use App\Exceptions\CantSaveProfileException;
use App\Interfaces\ProfileRepositoryInterface;
use App\Models\Profile;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;

class ProfileRepository implements ProfileRepositoryInterface {

    /**
     * @param $user_id
     * @return Builder|Model|object|null
     */
    public function getProfileFromUser($user_id) {
        return Profile::query()->where('user_id', $user_id)->first();
    }

    /**
     * @param $user_id
     * @param $validated
     * @return void
     * @throws CantSaveProfileException
     */
    public function update($user_id, $validated): void {
        $profile = $this->getProfileFromUser($user_id);
        $profile->fill($validated);
        if (!$profile->update()) {
            throw new CantSaveProfileException("プロフィールの保存に失敗しました。");
        }
    }
}
