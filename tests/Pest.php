<?php

use App\Enums\Permissions;
use App\Models\ClientError;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

pest()->extend(TestCase::class)->use(RefreshDatabase::class)->in('Feature');
pest()->extend(TestCase::class)->in('Unit');

// Shared acting-as helpers (use test() to access the current test instance)

function actingAsListUsers(): TestCase
{
    $user = User::factory()->create();
    $user->givePermissionTo(Permissions::LIST_USERS->value);

    return test()->actingAs($user);
}

function actingAsCreateUsers(): TestCase
{
    $user = User::factory()->create();
    $user->givePermissionTo(Permissions::CREATE_USERS->value);

    return test()->actingAs($user);
}

function actingAsUpdateUsers(): TestCase
{
    $user = User::factory()->create();
    $user->givePermissionTo(Permissions::UPDATE_USERS->value);

    return test()->actingAs($user);
}

function actingAsDeleteUsers(): TestCase
{
    $user = User::factory()->create();
    $user->givePermissionTo(Permissions::DELETE_USERS->value);

    return test()->actingAs($user);
}

function actingAsManageRoles(): TestCase
{
    $user = User::factory()->create();
    $user->givePermissionTo(Permissions::MANAGE_ROLES->value);

    return test()->actingAs($user);
}

function actingAsManageErrors(): TestCase
{
    $user = User::factory()->create();
    $user->givePermissionTo(Permissions::MANAGE_ERRORS->value);

    return test()->actingAs($user);
}

// Shared model helpers

function createClientError(array $attributes = []): ClientError
{
    return ClientError::create([
        'fingerprint' => $attributes['fingerprint'] ?? fake()->sha256(),
        'message' => $attributes['message'] ?? 'Test error',
        'stack' => $attributes['stack'] ?? 'Error: Test error\n    at Component',
        'url' => $attributes['url'] ?? 'http://localhost/dashboard',
        'first_seen_at' => $attributes['first_seen_at'] ?? now(),
        'last_seen_at' => $attributes['last_seen_at'] ?? now(),
        ...$attributes,
    ]);
}
