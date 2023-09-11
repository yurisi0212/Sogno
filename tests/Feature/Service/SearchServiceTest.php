<?php

namespace Tests\Feature\Service;

use App\Services\DreamService;
use App\Services\SearchService;
use Database\Seeders\DreamSeeder;
use Database\Seeders\SearchHistorySeeder;
use Database\Seeders\UserSeeder;
use Illuminate\Foundation\Testing\DatabaseMigrations;
use Tests\TestCase;

class SearchServiceTest extends TestCase {

    use DatabaseMigrations;

    public function setUp(): void {
        parent::setUp();
        $this->seed([UserSeeder::class, SearchHistorySeeder::class]);
        $this->dreamService = app(SearchService::class);
    }

    public function test_getSearchHistories() {
        $user_id = 1;
        $latest = $this->dreamService->getSearchHistories($user_id);
        $this->assertSame(count($latest), 5);
    }

    public function test_getSearchResult() {
        $this->markTestSkipped("未実装");
        $user_id = 1;
        $keyword = "testKeyword";
        $this->dreamService->getSearchResult($user_id, $keyword);
    }
}
