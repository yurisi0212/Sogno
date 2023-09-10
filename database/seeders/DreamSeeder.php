<?php

namespace Database\Seeders;

use App\Models\Dream;
use Illuminate\Database\Seeder;

class DreamSeeder extends Seeder {
    /**
     * Run the database seeds.
     */
    public function run(): void {
        for ($i = 0; $i < 100; $i++) {
            $init_date = "2000-01-01 00:00:00";
            Dream::create(
                [
                    'title' => 'title'.$i,
                    'content' => 'content'.$i,
                    'user_id' => 1,
                    'created_at' => $init_date,
                    'updated_at' => $init_date
                ]
            );
        }

    }
}
