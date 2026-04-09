<?php

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
    $this->put(route('roles.update', $role))->assertRedirect(route('login'));
});

it('without permission returns 403', function () {
    $role = Role::where('name', Roles::ADMIN->value)->first();

    $this->actingAs(User::factory()->create())
        ->put(route('roles.update', $role), [
            'label' => 'Updated',
            'hex_color' => '#FF5733',
        ])->assertForbidden();
});

it('updates role', function () {
    $role = Role::where('name', Roles::ADMIN->value)->first();

    actingAsManageRoles()
        ->from(route('roles.edit'))
        ->put(route('roles.update', $role), [
            'label' => 'Moderador',
            'hex_color' => '#00FF00',
        ])->assertRedirect(route('roles.edit'));

    $this->assertDatabaseHas('roles', [
        'id' => $role->id,
        'label' => 'Moderador',
        'hex_color' => '#00FF00',
    ]);
});

it('cannot update super admin role', function () {
    $superAdmin = Role::where('name', Roles::SUPER_ADMIN->value)->first();

    actingAsManageRoles()->put(route('roles.update', $superAdmin), [
        'label' => 'Hacked',
        'hex_color' => '#000000',
    ]);

    $this->assertDatabaseHas('roles', [
        'id' => $superAdmin->id,
        'label' => Roles::SUPER_ADMIN->label(),
    ]);
});

it('validates required fields', function () {
    $role = Role::where('name', Roles::ADMIN->value)->first();

    actingAsManageRoles()
        ->put(route('roles.update', $role), [])
        ->assertSessionHasErrors(['label', 'hex_color']);
});
