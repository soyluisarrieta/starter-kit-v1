<?php

namespace Tests\Feature\Settings\Roles;

use App\Enums\Permissions;
use App\Enums\Roles;
use App\Models\User;
use Database\Seeders\PermissionSeeder;
use Database\Seeders\RoleSeeder;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class RoleIndexTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();

        $this->seed(PermissionSeeder::class);
        $this->seed(RoleSeeder::class);
    }

    public function test_guests_redirected_to_login(): void
    {
        $this->get(route('roles.edit'))->assertRedirect(route('login'));
    }

    public function test_without_permission_returns_403(): void
    {
        $this->actingAs(User::factory()->create())
            ->get(route('roles.edit'))
            ->assertForbidden();
    }

    public function test_with_permission_returns_ok(): void
    {
        $user = User::factory()->create();
        $user->givePermissionTo(Permissions::MANAGE_ROLES->value);

        $this->actingAs($user)
            ->get(route('roles.edit'))
            ->assertOk();
    }

    public function test_response_excludes_super_admin_role(): void
    {
        $user = User::factory()->create();
        $user->givePermissionTo(Permissions::MANAGE_ROLES->value);

        $response = $this->actingAs($user)
            ->get(route('roles.edit'))
            ->assertOk();

        $roleNames = collect($response->original->getData()['page']['props']['roles'])
            ->pluck('name');

        $this->assertFalse($roleNames->contains(Roles::SUPER_ADMIN->value));
        $this->assertTrue($roleNames->contains(Roles::ADMIN->value));
    }
}
