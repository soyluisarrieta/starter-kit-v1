<?php

use App\Models\User;
use Database\Seeders\PermissionSeeder;
use Database\Seeders\RoleSeeder;

beforeEach(function () {
    /** @var Tests\TestCase $this */
    $this->seed(PermissionSeeder::class);
    $this->seed(RoleSeeder::class);
});

it('guests are redirected to login', function () {
    $user = User::factory()->create();
    $this->delete(route('users.destroy', $user))->assertRedirect(route('login'));
});

it('without permission returns 403', function () {
    $target = User::factory()->create();

    $this->actingAs(User::factory()->create())
        ->delete(route('users.destroy', $target), ['password' => 'password'])
        ->assertForbidden();
});

it('with permission deletes user', function () {
    $target = User::factory()->create();

    actingAsDeleteUsers()->delete(route('users.destroy', $target), ['password' => 'password']);

    $this->assertDatabaseMissing('users', ['id' => $target->id]);
});

it('requires current password', function () {
    $target = User::factory()->create();

    actingAsDeleteUsers()
        ->delete(route('users.destroy', $target), [])
        ->assertSessionHasErrors('password');
});

it('rejects wrong password', function () {
    $target = User::factory()->create();

    actingAsDeleteUsers()
        ->delete(route('users.destroy', $target), ['password' => 'wrong-password'])
        ->assertSessionHasErrors('password');
});
