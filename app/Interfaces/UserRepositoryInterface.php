<?php

namespace App\Interfaces;

interface UserRepositoryInterface{
    public function getUserWithProfile($id);
    public function find($id);
    public function update($id, $validated);
    public function delete($id);
}
