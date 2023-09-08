<?php
namespace App\Interfaces;

interface ProfileRepositoryInterface{
    public function getProfileFromUser($user_id);

    public function update($user_id, $validated): void;
}
