<?php

use App\Models\User;
use Database\Seeders\PermissionSeeder;
use Database\Seeders\RoleSeeder;
use Tests\TestCase;

beforeEach(function () {
    /** @var TestCase $this */
    $this->seed(PermissionSeeder::class);
    $this->seed(RoleSeeder::class);
});

it('guests are redirected to login', function () {
    $this->post(route('users.store'))->assertRedirect(route('login'));
});

it('without permission returns 403', function () {
    $this->actingAs(User::factory()->create())
        ->post(route('users.store'), [
            'name' => 'Test',
            'last_name' => 'User',
            'email' => 'new@example.com',
        ])->assertForbidden();
});

it('creates user and redirects back', function () {
    actingAsCreateUsers()
        ->from(route('users'))
        ->post(route('users.store'), [
            'name' => 'Test',
            'last_name' => 'User',
            'email' => 'new@example.com',
        ])->assertRedirect(route('users'));

    $this->assertDatabaseHas('users', ['email' => 'new@example.com']);
});

it('validates required fields', function () {
    actingAsCreateUsers()
        ->post(route('users.store'), [])
        ->assertSessionHasErrors(['name', 'last_name', 'email']);
});

it('validates unique email', function () {
    $existing = User::factory()->create();

    actingAsCreateUsers()
        ->post(route('users.store'), [
            'name' => 'Test',
            'last_name' => 'User',
            'email' => $existing->email,
        ])->assertSessionHasErrors('email');
});

it('validates name format rejects numbers', function () {
    actingAsCreateUsers()
        ->post(route('users.store'), [
            'name' => 'Test123',
            'last_name' => 'User',
            'email' => 'new@example.com',
        ])->assertSessionHasErrors('name');
});

it('validates name min length', function () {
    actingAsCreateUsers()
        ->post(route('users.store'), [
            'name' => 'Ab',
            'last_name' => 'User',
            'email' => 'new@example.com',
        ])->assertSessionHasErrors('name');
});
