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
    $this->put(route('users.update', $user))->assertRedirect(route('login'));
});

it('without permission returns 403', function () {
    $target = User::factory()->create();

    $this->actingAs(User::factory()->create())
        ->put(route('users.update', $target), [
            'name' => 'Updated',
            'last_name' => 'Name',
            'email' => $target->email,
        ])->assertForbidden();
});

it('with permission updates user and redirects back', function () {
    $target = User::factory()->create();

    actingAsUpdateUsers()
        ->from(route('users'))
        ->put(route('users.update', $target), [
            'name' => 'Updated',
            'last_name' => 'Name',
            'email' => $target->email,
        ])->assertRedirect(route('users'));

    $this->assertDatabaseHas('users', [
        'id' => $target->id,
        'name' => 'Updated',
        'last_name' => 'Name',
    ]);
});

it('does not update when validation fails', function () {
    $target = User::factory()->create();
    $originalName = $target->name;

    actingAsUpdateUsers()
        ->put(route('users.update', $target), [
            'name' => '',
            'last_name' => '',
            'email' => '',
        ])->assertSessionHasErrors(['name', 'last_name', 'email']);

    $this->assertDatabaseHas('users', [
        'id' => $target->id,
        'name' => $originalName,
    ]);
});

it('validates unique email ignoring self', function () {
    $other = User::factory()->create();
    $target = User::factory()->create();

    actingAsUpdateUsers()
        ->put(route('users.update', $target), [
            'name' => 'Test',
            'last_name' => 'User',
            'email' => $other->email,
        ])->assertSessionHasErrors('email');

    actingAsUpdateUsers()
        ->put(route('users.update', $target), [
            'name' => 'Test',
            'last_name' => 'User',
            'email' => $target->email,
        ])->assertSessionHasNoErrors();
});
