<?php

namespace Database\Seeders;

use App\Models\SearchHistory;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class SearchHistorySeeder extends Seeder {
    /**
     * Run the database seeds.
     */
    public function run(): void {
        $init_date = "2000-01-01 00:00:00";
        for($i = 0; $i < 100; $i++){
            SearchHistory::create([
                "user_id" => 1,
                "text" => $i."history".$i,
                "updated_at" => $init_date,
                "created_at" => $init_date
            ]);
        }
    }
}
