<?php

namespace App\Services;

use App\Exceptions\CantSaveProfileException;
use App\Models\Profile;

class ProfileService{

    /**
     * @throws CantSaveProfileException
     */
    public function saveProfile($user_id, $validated): void {
        $profile = Profile::query()->where('user_id', $user_id)->first();
        $profile->fill($validated);
        if(!$profile->save()){
            throw new CantSaveProfileException("プロフィールの保存に失敗しました。");
        }
    }
}
