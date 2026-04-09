<?php

use App\Models\User;
use Database\Seeders\PermissionSeeder;
use Database\Seeders\RoleSeeder;
use Illuminate\Support\Str;
use Spatie\Permission\Models\Role;
use Tests\TestCase;

beforeEach(function () {
    /** @var TestCase $this */
    $this->seed(PermissionSeeder::class);
    $this->seed(RoleSeeder::class);
});

it('guests are redirected to login', function () {
    $this->post(route('roles.store'))->assertRedirect(route('login'));
});

it('without permission returns 403', function () {
    $this->actingAs(User::factory()->create())
        ->post(route('roles.store'), [
            'label' => 'Editor',
            'hex_color' => '#FF5733',
        ])->assertForbidden();
});

it('creates role with slug name', function () {
    actingAsManageRoles()
        ->from(route('roles.edit'))
        ->post(route('roles.store'), [
            'label' => 'Content Editor',
            'hex_color' => '#FF5733',
        ])->assertRedirect(route('roles.edit'));

    $this->assertDatabaseHas('roles', [
        'label' => 'Content Editor',
        'name' => Str::slug('Content Editor'),
        'hex_color' => '#FF5733',
    ]);
});

it('validates required fields', function () {
    actingAsManageRoles()
        ->post(route('roles.store'), [])
        ->assertSessionHasErrors(['label', 'hex_color']);
});

it('validates unique label', function () {
    Role::create(['name' => 'editor', 'label' => 'Editor', 'hex_color' => '#000000']);

    actingAsManageRoles()
        ->post(route('roles.store'), [
            'label' => 'Editor',
            'hex_color' => '#FF5733',
        ])->assertSessionHasErrors('label');
});

it('validates hex color format', function () {
    actingAsManageRoles()
        ->post(route('roles.store'), [
            'label' => 'Editor',
            'hex_color' => 'not-a-color',
        ])->assertSessionHasErrors('hex_color');
});
