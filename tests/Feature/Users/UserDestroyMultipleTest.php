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
    $this->post(route('users.destroyMultiple'))->assertRedirect(route('login'));
});

it('without permission returns 403', function () {
    $target = User::factory()->create();

    $this->actingAs(User::factory()->create())
        ->post(route('users.destroyMultiple'), [
            'ids' => [$target->id],
            'password' => 'password',
        ])->assertForbidden();
});

it('deletes selected users', function () {
    $targets = User::factory()->count(3)->create();
    $ids = $targets->pluck('id')->toArray();

    actingAsDeleteUsers()->post(route('users.destroyMultiple'), [
        'ids' => $ids,
        'password' => 'password',
    ]);

    foreach ($ids as $id) {
        $this->assertDatabaseMissing('users', ['id' => $id]);
    }
});

it('requires password', function () {
    $target = User::factory()->create();

    actingAsDeleteUsers()
        ->post(route('users.destroyMultiple'), ['ids' => [$target->id]])
        ->assertSessionHasErrors('password');
});

it('validates ids exist', function () {
    actingAsDeleteUsers()
        ->post(route('users.destroyMultiple'), [
            'ids' => [99999],
            'password' => 'password',
        ])->assertSessionHasErrors('ids.0');
});

it('requires at least one id', function () {
    actingAsDeleteUsers()
        ->post(route('users.destroyMultiple'), [
            'ids' => [],
            'password' => 'password',
        ])->assertSessionHasErrors('ids');
});
