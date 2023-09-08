<?php

namespace App\Interfaces;

interface UserRepositoryInterface{
    public function getUserWithProfile($id);
    public function find($id);
    public function update($id, $validated): void;
    public function delete($id): void;
}
