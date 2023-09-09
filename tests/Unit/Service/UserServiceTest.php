<?php

namespace Tests\Unit\Service;

use App\Models\User;
use App\Services\UserService;
use DateTime;
use Tests\TestCase;

class UserServiceTest extends TestCase {

    protected function setUp(): void {
        parent::setUp();
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
        $validated = ["name" => "testName", "introduction" => "testIntroduction"];
        $before = User::find(1);
        $this->userService->update(1, $validated);
        $after = User::find(1);
        $updated_at = (new DateTime())->format("Y-m-d H:i:s");
        $after_updated_at = (new DateTime($after->updated_at))->format("Y-m-d H:i:s");

        $this->assertTrue(($before->name !== $after->name) && ($after_updated_at === $updated_at));
    }

    public function test_deleteUser() {
        $this->userService->deleteUser(1);
        $user = User::find(1);
        $this->assertNull($user);
    }
}
