<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class UserSeeder extends Seeder {
    /**
     * Run the database seeds.
     */
    public function run() {
        $init_date = "2000-01-01 00:00:00";
        User::create(
            [
                'name' => 'yurisi',
                'email' => 'yurisi@example.com',
                'password' => bcrypt('yurisi'),
                'created_at' => $init_date,
                'updated_at' => $init_date
            ]
        );

        User::create(
            [
                'name' => 'user2',
                'email' => 'user2@example.com',
                'password' => bcrypt('user2'),
                'created_at' => $init_date,
                'updated_at' => $init_date
            ]
        );
    }
}
