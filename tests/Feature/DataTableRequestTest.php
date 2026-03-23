<?php

use Database\Seeders\PermissionSeeder;
use Database\Seeders\RoleSeeder;

beforeEach(function () {
    /** @var Tests\TestCase $this */
    $this->seed(PermissionSeeder::class);
    $this->seed(RoleSeeder::class);
});

it('index works without query params', function () {
    actingAsListUsers()->getJson(route('users'))->assertOk();
});

it('per page accepts allowed values', function () {
    foreach ([10, 25, 50, 100] as $value) {
        actingAsListUsers()->getJson(route('users', ['perPage' => $value]))->assertOk();
    }
});

it('per page rejects arbitrary value', function () {
    actingAsListUsers()
        ->getJson(route('users', ['perPage' => 999]))
        ->assertJsonValidationErrors('perPage');
});

it('per page rejects string value', function () {
    actingAsListUsers()
        ->getJson(route('users', ['perPage' => 'all']))
        ->assertJsonValidationErrors('perPage');
});

it('sort order accepts asc and desc', function () {
    foreach (['asc', 'desc'] as $order) {
        actingAsListUsers()->getJson(route('users', ['sortOrder' => $order]))->assertOk();
    }
});

it('sort order rejects invalid value', function () {
    actingAsListUsers()
        ->getJson(route('users', ['sortOrder' => 'random']))
        ->assertJsonValidationErrors('sortOrder');
});

it('sort by with non-sortable column falls back silently', function () {
    actingAsListUsers()->getJson(route('users', ['sortBy' => 'roleIds']))->assertOk();
});

it('sort by rejects non-alpha value', function () {
    actingAsListUsers()
        ->getJson(route('users', ['sortBy' => 'id; DROP TABLE users;']))
        ->assertJsonValidationErrors('sortBy');
});

it('search accepts normal string', function () {
    actingAsListUsers()->getJson(route('users', ['search' => 'Luis']))->assertOk();
});

it('search rejects string over 100 chars', function () {
    actingAsListUsers()
        ->getJson(route('users', ['search' => str_repeat('a', 101)]))
        ->assertJsonValidationErrors('search');
});
