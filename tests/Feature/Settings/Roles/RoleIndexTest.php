<?php

use App\Enums\Permissions;
use App\Enums\Roles;
use App\Models\User;
use Database\Seeders\PermissionSeeder;
use Database\Seeders\RoleSeeder;

beforeEach(function () {
    /** @var Tests\TestCase $this */
    $this->seed(PermissionSeeder::class);
    $this->seed(RoleSeeder::class);
});

it('guests are redirected to login', function () {
    $this->get(route('roles.edit'))->assertRedirect(route('login'));
});

it('without permission returns 403', function () {
    $this->actingAs(User::factory()->create())
        ->get(route('roles.edit'))
        ->assertForbidden();
});

it('with permission returns ok', function () {
    $user = User::factory()->create();
    $user->givePermissionTo(Permissions::MANAGE_ROLES->value);

    $this->actingAs($user)->get(route('roles.edit'))->assertOk();
});

it('response excludes super admin role', function () {
    $user = User::factory()->create();
    $user->givePermissionTo(Permissions::MANAGE_ROLES->value);

    $response = $this->actingAs($user)->get(route('roles.edit'))->assertOk();

    $roleNames = collect($response->original->getData()['page']['props']['roles'])
        ->pluck('name');

    expect($roleNames->contains(Roles::SUPER_ADMIN->value))->toBeFalse();
    expect($roleNames->contains(Roles::ADMIN->value))->toBeTrue();
});
