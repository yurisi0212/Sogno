<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder {
    /**
     * Seed the application's database.
     */
    public function run(): void {
       if(config('app.env') === "local" || config('app.env') === "testing"){
           $this->call(UserSeeder::class);
           $this->call(DreamSeeder::class);
           $this->call(SearchHistorySeeder::class);
       }
    }
}
