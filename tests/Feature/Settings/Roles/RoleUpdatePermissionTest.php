<?php

use App\Enums\Permissions;
use App\Enums\Roles;
use App\Models\User;
use Database\Seeders\PermissionSeeder;
use Database\Seeders\RoleSeeder;
use Spatie\Permission\Models\Role;
use Tests\TestCase;

beforeEach(function () {
    /** @var TestCase $this */
    $this->seed(PermissionSeeder::class);
    $this->seed(RoleSeeder::class);
});

it('guests are redirected to login', function () {
    $role = Role::where('name', Roles::ADMIN->value)->first();
    $this->put(route('roles.update-permissions', $role))->assertRedirect(route('login'));
});

it('without permission returns 403', function () {
    $role = Role::where('name', Roles::ADMIN->value)->first();

    $this->actingAs(User::factory()->create())
        ->put(route('roles.update-permissions', $role), [
            'permission' => Permissions::LIST_USERS->value,
            'enabled' => true,
        ])->assertForbidden();
});

it('enables permission', function () {
    /** @var Role $role */
    $role = Role::where('name', Roles::ADMIN->value)->first();

    actingAsManageRoles()->put(route('roles.update-permissions', $role), [
        'permission' => Permissions::LIST_USERS->value,
        'enabled' => true,
    ]);

    expect($role->fresh()->hasPermissionTo(Permissions::LIST_USERS->value))->toBeTrue();
});

it('disables permission', function () {
    /** @var Role $role */
    $role = Role::where('name', Roles::ADMIN->value)->first();
    $role->givePermissionTo(Permissions::LIST_USERS->value);

    actingAsManageRoles()->put(route('roles.update-permissions', $role), [
        'permission' => Permissions::LIST_USERS->value,
        'enabled' => false,
    ]);

    expect($role->fresh()->hasPermissionTo(Permissions::LIST_USERS->value))->toBeFalse();
});

it('cannot modify super admin permissions', function () {
    /** @var Role $superAdmin */
    $superAdmin = Role::where('name', Roles::SUPER_ADMIN->value)->first();
    $permissionCount = $superAdmin->permissions->count();

    actingAsManageRoles()->put(route('roles.update-permissions', $superAdmin), [
        'permission' => Permissions::LIST_USERS->value,
        'enabled' => false,
    ]);

    expect($superAdmin->fresh()->permissions)->toHaveCount($permissionCount);
});

it('validates permission exists', function () {
    $role = Role::where('name', Roles::ADMIN->value)->first();

    actingAsManageRoles()
        ->put(route('roles.update-permissions', $role), [
            'permission' => 'nonexistent.permission',
            'enabled' => true,
        ])->assertSessionHasErrors('permission');
});
