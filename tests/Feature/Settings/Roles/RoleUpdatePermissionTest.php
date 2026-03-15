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

class RoleUpdatePermissionTest extends TestCase
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
        $this->put(route('roles.update-permissions', $role))->assertRedirect(route('login'));
    }

    public function test_without_permission_returns_403(): void
    {
        $role = Role::where('name', Roles::ADMIN->value)->first();

        $this->actingAs(User::factory()->create())
            ->put(route('roles.update-permissions', $role), [
                'permission' => Permissions::LIST_USERS->value,
                'enabled' => true,
            ])
            ->assertForbidden();
    }

    public function test_enable_permission(): void
    {
        /** @var Role $role */
        $role = Role::where('name', Roles::ADMIN->value)->first();

        $this->actingAsWithPermission()
            ->put(route('roles.update-permissions', $role), [
                'permission' => Permissions::LIST_USERS->value,
                'enabled' => true,
            ]);

        $this->assertTrue($role->fresh()->hasPermissionTo(Permissions::LIST_USERS->value));
    }

    public function test_disable_permission(): void
    {
        /** @var Role $role */
        $role = Role::where('name', Roles::ADMIN->value)->first();
        $role->givePermissionTo(Permissions::LIST_USERS->value);

        $this->actingAsWithPermission()
            ->put(route('roles.update-permissions', $role), [
                'permission' => Permissions::LIST_USERS->value,
                'enabled' => false,
            ]);

        $this->assertFalse($role->fresh()->hasPermissionTo(Permissions::LIST_USERS->value));
    }

    public function test_cannot_modify_super_admin_permissions(): void
    {
        /** @var Role $superAdmin */
        $superAdmin = Role::where('name', Roles::SUPER_ADMIN->value)->first();
        $permissionCount = $superAdmin->permissions->count();

        $this->actingAsWithPermission()
            ->put(route('roles.update-permissions', $superAdmin), [
                'permission' => Permissions::LIST_USERS->value,
                'enabled' => false,
            ]);

        $this->assertCount($permissionCount, $superAdmin->fresh()->permissions);
    }

    public function test_validates_permission_exists(): void
    {
        $role = Role::where('name', Roles::ADMIN->value)->first();

        $this->actingAsWithPermission()
            ->put(route('roles.update-permissions', $role), [
                'permission' => 'nonexistent.permission',
                'enabled' => true,
            ])
            ->assertSessionHasErrors('permission');
    }
}
