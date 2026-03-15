<?php

namespace Tests\Feature\Users;

use App\Enums\Permissions;
use App\Models\User;
use Database\Seeders\PermissionSeeder;
use Database\Seeders\RoleSeeder;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class UserDestroyTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();

        $this->seed(PermissionSeeder::class);
        $this->seed(RoleSeeder::class);
    }

    private function actingAsWithPermission(): static
    {
        $user = User::factory()->create();
        $user->givePermissionTo(Permissions::DELETE_USERS->value);

        return $this->actingAs($user);
    }

    public function test_guests_redirected_to_login(): void
    {
        $user = User::factory()->create();
        $this->delete(route('users.destroy', $user))->assertRedirect(route('login'));
    }

    public function test_without_permission_returns_403(): void
    {
        $target = User::factory()->create();

        $this->actingAs(User::factory()->create())
            ->delete(route('users.destroy', $target), ['password' => 'password'])
            ->assertForbidden();
    }

    public function test_with_permission_deletes_user(): void
    {
        $target = User::factory()->create();

        $this->actingAsWithPermission()
            ->delete(route('users.destroy', $target), ['password' => 'password']);

        $this->assertDatabaseMissing('users', ['id' => $target->id]);
    }

    public function test_requires_current_password(): void
    {
        $target = User::factory()->create();

        $this->actingAsWithPermission()
            ->delete(route('users.destroy', $target), [])
            ->assertSessionHasErrors('password');
    }

    public function test_rejects_wrong_password(): void
    {
        $target = User::factory()->create();

        $this->actingAsWithPermission()
            ->delete(route('users.destroy', $target), ['password' => 'wrong-password'])
            ->assertSessionHasErrors('password');
    }
}
