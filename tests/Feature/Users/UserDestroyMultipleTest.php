<?php

namespace Tests\Feature\Users;

use App\Enums\Permissions;
use App\Models\User;
use Database\Seeders\PermissionSeeder;
use Database\Seeders\RoleSeeder;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class UserDestroyMultipleTest extends TestCase
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
        $this->post(route('users.destroyMultiple'))->assertRedirect(route('login'));
    }

    public function test_without_permission_returns_403(): void
    {
        $target = User::factory()->create();

        $this->actingAs(User::factory()->create())
            ->post(route('users.destroyMultiple'), [
                'ids' => [$target->id],
                'password' => 'password',
            ])
            ->assertForbidden();
    }

    public function test_deletes_selected_users(): void
    {
        $targets = User::factory()->count(3)->create();
        $ids = $targets->pluck('id')->toArray();

        $this->actingAsWithPermission()
            ->post(route('users.destroyMultiple'), [
                'ids' => $ids,
                'password' => 'password',
            ]);

        foreach ($ids as $id) {
            $this->assertDatabaseMissing('users', ['id' => $id]);
        }
    }

    public function test_requires_password(): void
    {
        $target = User::factory()->create();

        $this->actingAsWithPermission()
            ->post(route('users.destroyMultiple'), [
                'ids' => [$target->id],
            ])
            ->assertSessionHasErrors('password');
    }

    public function test_validates_ids_exist(): void
    {
        $this->actingAsWithPermission()
            ->post(route('users.destroyMultiple'), [
                'ids' => [99999],
                'password' => 'password',
            ])
            ->assertSessionHasErrors('ids.0');
    }

    public function test_requires_at_least_one_id(): void
    {
        $this->actingAsWithPermission()
            ->post(route('users.destroyMultiple'), [
                'ids' => [],
                'password' => 'password',
            ])
            ->assertSessionHasErrors('ids');
    }
}
