<?php

namespace Feature\Service;

use App\Models\User;
use App\Services\UserService;
use Carbon\Carbon;
use Database\Seeders\UserSeeder;
use Illuminate\Foundation\Testing\DatabaseMigrations;
use Tests\TestCase;

class UserServiceTest extends TestCase {

    use DatabaseMigrations;

    protected function setUp(): void {
        parent::setUp();
        $this->seed(UserSeeder::class);
        $this->userService = app(UserService::class);
    }

    public function test_getUserWithProfile() {
        $result = $this->userService->getUserWithProfile(1);
        $result = $result->toArray();
        $success = User::query()
            ->select('id', 'name')
            ->with('profile')
            ->findOrFail(1)->toArray();

        $this->assertSame($result, $success);
    }

    public function test_update() {
        Carbon::setTestNow();
        $validated = ["name" => "testName", "introduction" => "testIntroduction"];
        $before = User::query()->with('profile')->find(1);
        $this->userService->update(1, $validated);
        $after = User::query()->with('profile')->find(1);
        $updated_at = (new Carbon())->toDateTimeString();
        $after_updated_at = (new Carbon($after->updated_at))->toDateTimeString();

        $this->assertNotSame($before->name, $after->name);
        $this->assertSame($before->profile->introduction, $after->profile->introduction);
        $this->assertSame($after_updated_at , $updated_at);

        $this->assertSame("testName", $after->name);
        $this->assertNotSame("testIntroduction", $after->profile->introduction);
    }

    public function test_deleteUser() {
        $this->userService->deleteUser(1);
        $user = User::find(1);
        $this->assertNull($user);
    }
}
