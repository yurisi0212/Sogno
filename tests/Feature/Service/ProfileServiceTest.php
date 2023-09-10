<?php

namespace Feature\Service;

use App\Models\User;
use App\Services\ProfileService;
use Carbon\Carbon;
use Database\Seeders\UserSeeder;
use Illuminate\Foundation\Testing\DatabaseMigrations;
use Tests\TestCase;

class ProfileServiceTest extends TestCase {

    use DatabaseMigrations;

    public function setUp(): void {
        parent::setUp();
        $this->seed(UserSeeder::class);
        $this->profileService = app(ProfileService::class);
    }

    /**
     * A basic feature test example.
     */
    public function test_update(): void {
        Carbon::setTestNow();
        $validated = ["name" => "testName", "introduction" => "testIntroduction"];
        $before = User::query()->with('profile')->find(1);
        $this->profileService->update(1, $validated);
        $after = User::query()->with('profile')->find(1);
        $updated_at = (new Carbon())->toDateTimeString();
        $after_updated_at = (new Carbon($after->profile->updated_at))->toDateTimeString();

        $this->assertSame($before->name, $after->name);
        $this->assertNotSame($before->profile->introduction, $after->profile->introduction);
        $this->assertSame($after_updated_at , $updated_at);

        $this->assertNotSame("testName", $after->name);
        $this->assertSame("testIntroduction", $after->profile->introduction);
    }
}
