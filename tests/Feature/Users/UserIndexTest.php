<?php

use App\Enums\Permissions;
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
    $this->get(route('users'))->assertRedirect(route('login'));
});

it('without permission returns 403', function () {
    $this->actingAs(User::factory()->create())
        ->get(route('users'))
        ->assertForbidden();
});

it('with permission returns ok', function () {
    $user = User::factory()->create();
    $user->givePermissionTo(Permissions::LIST_USERS->value);

    $this->actingAs($user)->get(route('users'))->assertOk();
});

it('json returns created users in data', function () {
    $users = User::factory()->count(3)->create();

    $actor = User::factory()->create();
    $actor->givePermissionTo(Permissions::LIST_USERS->value);

    $response = $this->actingAs($actor)
        ->getJson(route('users'))
        ->assertOk()
        ->assertJsonStructure(['data', 'current_page', 'per_page', 'total']);

    $returnedEmails = collect($response->json('data'))->pluck('email');

    foreach ($users as $user) {
        expect($returnedEmails->contains($user->email))->toBeTrue();
    }
});

it('json paginates results', function () {
    User::factory()->count(15)->create();

    $actor = User::factory()->create();
    $actor->givePermissionTo(Permissions::LIST_USERS->value);

    $response = $this->actingAs($actor)
        ->getJson(route('users', ['perPage' => 10]))
        ->assertOk();

    // 16 total users (15 + actor), perPage 10 → first page has 10
    expect($response->json('data'))->toHaveCount(10);
    expect($response->json('total'))->toBe(16);
});
