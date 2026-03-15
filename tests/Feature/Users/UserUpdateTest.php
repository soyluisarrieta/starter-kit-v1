<?php

namespace Tests\Feature\Users;

use App\Enums\Permissions;
use App\Models\User;
use Database\Seeders\PermissionSeeder;
use Database\Seeders\RoleSeeder;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class UserUpdateTest extends TestCase
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
        $user->givePermissionTo(Permissions::UPDATE_USERS->value);

        return $this->actingAs($user);
    }

    public function test_guests_redirected_to_login(): void
    {
        $user = User::factory()->create();
        $this->put(route('users.update', $user))->assertRedirect(route('login'));
    }

    public function test_without_permission_returns_403(): void
    {
        $target = User::factory()->create();

        $this->actingAs(User::factory()->create())
            ->put(route('users.update', $target), [
                'name' => 'Updated',
                'last_name' => 'Name',
                'email' => $target->email,
            ])
            ->assertForbidden();
    }

    public function test_with_permission_updates_user_and_redirects_back(): void
    {
        $target = User::factory()->create();

        $this->actingAsWithPermission()
            ->from(route('users'))
            ->put(route('users.update', $target), [
                'name' => 'Updated',
                'last_name' => 'Name',
                'email' => $target->email,
            ])
            ->assertRedirect(route('users'));

        $this->assertDatabaseHas('users', [
            'id' => $target->id,
            'name' => 'Updated',
            'last_name' => 'Name',
        ]);
    }

    public function test_does_not_update_when_validation_fails(): void
    {
        $target = User::factory()->create();
        $originalName = $target->name;

        $this->actingAsWithPermission()
            ->put(route('users.update', $target), [
                'name' => '',
                'last_name' => '',
                'email' => '',
            ])
            ->assertSessionHasErrors(['name', 'last_name', 'email']);

        $this->assertDatabaseHas('users', [
            'id' => $target->id,
            'name' => $originalName,
        ]);
    }

    public function test_validates_unique_email_ignoring_self(): void
    {
        $other = User::factory()->create();
        $target = User::factory()->create();

        $this->actingAsWithPermission()
            ->put(route('users.update', $target), [
                'name' => 'Test',
                'last_name' => 'User',
                'email' => $other->email,
            ])
            ->assertSessionHasErrors('email');

        $this->actingAsWithPermission()
            ->put(route('users.update', $target), [
                'name' => 'Test',
                'last_name' => 'User',
                'email' => $target->email,
            ])
            ->assertSessionHasNoErrors();
    }
}
