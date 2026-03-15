<?php

namespace Tests\Feature\Settings\Roles;

use App\Enums\Permissions;
use App\Enums\Roles;
use App\Models\User;
use Database\Seeders\PermissionSeeder;
use Database\Seeders\RoleSeeder;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Spatie\Permission\Models\Role;
use Tests\TestCase;

class RoleDestroyTest extends TestCase
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
        $user->givePermissionTo(Permissions::MANAGE_ROLES->value);

        return $this->actingAs($user);
    }

    public function test_guests_redirected_to_login(): void
    {
        $role = Role::where('name', Roles::ADMIN->value)->first();
        $this->delete(route('roles.destroy', $role))->assertRedirect(route('login'));
    }

    public function test_without_permission_returns_403(): void
    {
        $role = Role::where('name', Roles::ADMIN->value)->first();

        $this->actingAs(User::factory()->create())
            ->delete(route('roles.destroy', $role), ['password' => 'password'])
            ->assertForbidden();
    }

    public function test_deletes_role_with_password(): void
    {
        // Create a second non-super-admin role so admin can be deleted
        Role::create(['name' => 'editor', 'label' => 'Editor', 'hex_color' => '#000000']);

        $admin = Role::where('name', Roles::ADMIN->value)->first();

        $this->actingAsWithPermission()
            ->delete(route('roles.destroy', $admin), ['password' => 'password']);

        $this->assertDatabaseMissing('roles', ['id' => $admin->id]);
    }

    public function test_cannot_delete_super_admin(): void
    {
        $superAdmin = Role::where('name', Roles::SUPER_ADMIN->value)->first();

        $this->actingAsWithPermission()
            ->delete(route('roles.destroy', $superAdmin), ['password' => 'password']);

        $this->assertDatabaseHas('roles', ['id' => $superAdmin->id]);
    }

    public function test_cannot_delete_last_non_super_admin_role(): void
    {
        $admin = Role::where('name', Roles::ADMIN->value)->first();

        $this->actingAsWithPermission()
            ->delete(route('roles.destroy', $admin), ['password' => 'password']);

        // Admin is the only non-super-admin role, should still exist
        $this->assertDatabaseHas('roles', ['id' => $admin->id]);
    }

    public function test_requires_current_password(): void
    {
        $role = Role::where('name', Roles::ADMIN->value)->first();

        $this->actingAsWithPermission()
            ->delete(route('roles.destroy', $role), [])
            ->assertSessionHasErrors('password');
    }
}
