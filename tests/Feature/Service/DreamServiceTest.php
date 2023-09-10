<?php

namespace Tests\Feature\Service;

use App\Models\Dream;
use App\Services\DreamService;
use App\Services\ProfileService;
use Database\Seeders\DatabaseSeeder;
use Database\Seeders\DreamSeeder;
use Database\Seeders\UserSeeder;
use Illuminate\Foundation\Testing\DatabaseMigrations;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class DreamServiceTest extends TestCase {

    use DatabaseMigrations;

    public function setUp(): void {
        parent::setUp();
        $this->seed([UserSeeder::class, DreamSeeder::class]);
        $this->dreamService = app(DreamService::class);
    }

    public function test_store() {
        $validated = [
            "title" => "testTitle",
            "content" => "testContent"
        ];
        $this->dreamService->store(1, $validated);
        $dream = Dream::query()->latest('id')->first();

        $this->assertSame($dream->id, 101);
        $this->assertSame($dream->title, "testTitle");
        $this->assertSame($dream->content, "testContent");
        $this->assertSame($dream->user_id, 1);

    }

    public function test_getDreams() {
        $dreams = $this->dreamService->getDreams(0);
        $this->assertSame($dreams[0]->title, "title0");
        $this->assertSame(count($dreams), 20);

        $dreams = $this->dreamService->getDreams(90);
        $this->assertSame($dreams[0]->title, "title90");
        $this->assertSame(count($dreams), 10);

        $dreams = $this->dreamService->getDreams(0, 50);
        $this->assertSame($dreams[0]->title, "title0");
        $this->assertSame(count($dreams), 50);

        $dreams = $this->dreamService->getDreams(30, 30);
        $this->assertSame($dreams[0]->title, "title30");
        $this->assertSame(count($dreams), 30);
    }
}
