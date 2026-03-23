<?php

use App\Models\User;
use Database\Seeders\PermissionSeeder;
use Database\Seeders\RoleSeeder;

beforeEach(function () {
    /** @var Tests\TestCase $this */
    $this->seed(PermissionSeeder::class);
    $this->seed(RoleSeeder::class);
});

// --- Index ---

it('guests are redirected to login', function () {
    $this->get(route('errors.index'))->assertRedirect(route('login'));
});

it('without permission returns 403', function () {
    $this->actingAs(User::factory()->create())
        ->get(route('errors.index'))
        ->assertForbidden();
});

it('with permission returns ok', function () {
    actingAsManageErrors()->get(route('errors.index'))->assertOk();
});

it('json returns paginated errors', function () {
    createClientError(['message' => 'Error A']);
    createClientError(['message' => 'Error B']);

    $response = actingAsManageErrors()
        ->getJson(route('errors.index'))
        ->assertOk()
        ->assertJsonStructure(['data', 'current_page', 'per_page', 'total']);

    expect($response->json('total'))->toBe(2);
});

it('json includes user name', function () {
    $user = User::factory()->create(['name' => 'Jane']);
    createClientError(['user_id' => $user->id]);

    $response = actingAsManageErrors()->getJson(route('errors.index'))->assertOk();

    expect($response->json('data.0.user.name'))->toBe('Jane');
});

it('default sort is last seen at desc', function () {
    $old = createClientError(['last_seen_at' => now()->subHour()]);
    $recent = createClientError(['last_seen_at' => now()]);

    $response = actingAsManageErrors()->getJson(route('errors.index'))->assertOk();

    $ids = array_column($response->json('data'), 'id');
    expect($ids[0])->toBe($recent->id);
});

// --- Resolve ---

it('resolve marks error as resolved', function () {
    $error = createClientError();

    actingAsManageErrors()->patch(route('errors.resolve', $error))->assertRedirect();

    expect($error->fresh()->resolved_at)->not->toBeNull();
});

it('resolve clears reopened at', function () {
    $error = createClientError(['reopened_at' => now()]);

    actingAsManageErrors()->patch(route('errors.resolve', $error));

    $error->refresh();
    expect($error->resolved_at)->not->toBeNull();
    expect($error->reopened_at)->toBeNull();
});

it('reopen sets reopened at', function () {
    $error = createClientError(['resolved_at' => now()]);

    actingAsManageErrors()->patch(route('errors.resolve', $error));

    $error->refresh();
    expect($error->resolved_at)->toBeNull();
    expect($error->reopened_at)->not->toBeNull();
});

it('resolve without permission returns 403', function () {
    $error = createClientError();

    $this->actingAs(User::factory()->create())
        ->patch(route('errors.resolve', $error))
        ->assertForbidden();
});

// --- Destroy ---

it('destroy deletes error', function () {
    $error = createClientError();

    actingAsManageErrors()->delete(route('errors.destroy', $error))->assertRedirect();

    $this->assertDatabaseMissing('client_errors', ['id' => $error->id]);
});

it('destroy without permission returns 403', function () {
    $error = createClientError();

    $this->actingAs(User::factory()->create())
        ->delete(route('errors.destroy', $error))
        ->assertForbidden();
});
