<?php

namespace Tests\Feature\Users;

use App\Enums\Permissions;
use App\Models\User;
use Database\Seeders\PermissionSeeder;
use Database\Seeders\RoleSeeder;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Hash;
use Tests\TestCase;

class UserStoreTest extends TestCase
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
        $user->givePermissionTo(Permissions::CREATE_USERS->value);

        return $this->actingAs($user);
    }

    public function test_guests_redirected_to_login(): void
    {
        $this->post(route('users.store'))->assertRedirect(route('login'));
    }

    public function test_without_permission_returns_403(): void
    {
        $this->actingAs(User::factory()->create())
            ->post(route('users.store'), [
                'name' => 'Test',
                'last_name' => 'User',
                'email' => 'new@example.com',
            ])
            ->assertForbidden();
    }

    public function test_creates_user_and_redirects_back(): void
    {
        $this->actingAsWithPermission()
            ->from(route('users'))
            ->post(route('users.store'), [
                'name' => 'Test',
                'last_name' => 'User',
                'email' => 'new@example.com',
            ])
            ->assertRedirect(route('users'));

        $this->assertDatabaseHas('users', ['email' => 'new@example.com']);
    }
    
    public function test_validates_required_fields(): void
    {
        $this->actingAsWithPermission()
            ->post(route('users.store'), [])
            ->assertSessionHasErrors(['name', 'last_name', 'email']);
    }

    public function test_validates_unique_email(): void
    {
        $existing = User::factory()->create();

        $this->actingAsWithPermission()
            ->post(route('users.store'), [
                'name' => 'Test',
                'last_name' => 'User',
                'email' => $existing->email,
            ])
            ->assertSessionHasErrors('email');
    }

    public function test_validates_name_format_rejects_numbers(): void
    {
        $this->actingAsWithPermission()
            ->post(route('users.store'), [
                'name' => 'Test123',
                'last_name' => 'User',
                'email' => 'new@example.com',
            ])
            ->assertSessionHasErrors('name');
    }

    public function test_validates_name_min_length(): void
    {
        $this->actingAsWithPermission()
            ->post(route('users.store'), [
                'name' => 'Ab',
                'last_name' => 'User',
                'email' => 'new@example.com',
            ])
            ->assertSessionHasErrors('name');
    }
}
