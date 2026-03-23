<?php

use App\Enums\Roles;
use App\Models\User;
use Database\Seeders\PermissionSeeder;
use Database\Seeders\RoleSeeder;
use Spatie\Permission\Models\Role;

beforeEach(function () {
    /** @var Tests\TestCase $this */
    $this->seed(PermissionSeeder::class);
    $this->seed(RoleSeeder::class);
});

it('guests are redirected to login', function () {
    $role = Role::where('name', Roles::ADMIN->value)->first();
    $this->delete(route('roles.destroy', $role))->assertRedirect(route('login'));
});

it('without permission returns 403', function () {
    $role = Role::where('name', Roles::ADMIN->value)->first();

    $this->actingAs(User::factory()->create())
        ->delete(route('roles.destroy', $role), ['password' => 'password'])
        ->assertForbidden();
});

it('deletes role with password', function () {
    // Create a second non-super-admin role so admin can be deleted
    Role::create(['name' => 'editor', 'label' => 'Editor', 'hex_color' => '#000000']);

    $admin = Role::where('name', Roles::ADMIN->value)->first();

    actingAsManageRoles()->delete(route('roles.destroy', $admin), ['password' => 'password']);

    $this->assertDatabaseMissing('roles', ['id' => $admin->id]);
});

it('cannot delete super admin', function () {
    $superAdmin = Role::where('name', Roles::SUPER_ADMIN->value)->first();

    actingAsManageRoles()->delete(route('roles.destroy', $superAdmin), ['password' => 'password']);

    $this->assertDatabaseHas('roles', ['id' => $superAdmin->id]);
});

it('cannot delete last non-super-admin role', function () {
    $admin = Role::where('name', Roles::ADMIN->value)->first();

    actingAsManageRoles()->delete(route('roles.destroy', $admin), ['password' => 'password']);

    // Admin is the only non-super-admin role, should still exist
    $this->assertDatabaseHas('roles', ['id' => $admin->id]);
});

it('requires current password', function () {
    $role = Role::where('name', Roles::ADMIN->value)->first();

    actingAsManageRoles()
        ->delete(route('roles.destroy', $role), [])
        ->assertSessionHasErrors('password');
});
