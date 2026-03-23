<?php

use App\Enums\Permissions;
use App\Models\User;
use Database\Seeders\PermissionSeeder;
use Database\Seeders\RoleSeeder;

beforeEach(function () {
    /** @var Tests\TestCase $this */
    $this->seed(PermissionSeeder::class);
    $this->seed(RoleSeeder::class);
});

it('default sort is id desc', function () {
    User::factory()->count(2)->create();

    $response = actingAsListUsers()->getJson(route('users'))->assertOk();

    $ids = array_column($response->json('data'), 'id');

    expect($ids[0])->toBeGreaterThan($ids[1]);
});

it('sort by name asc', function () {
    User::factory()->create(['name' => 'Zara']);
    User::factory()->create(['name' => 'Alice']);

    $response = actingAsListUsers()
        ->getJson(route('users', ['sortBy' => 'name', 'sortOrder' => 'asc']))
        ->assertOk();

    $names = array_column($response->json('data'), 'name');

    expect($names)->toBe(collect($names)->sort()->values()->all());
});

it('invalid sort column falls back to default', function () {
    User::factory()->count(3)->create();

    $response = actingAsListUsers()
        ->getJson(route('users', ['sortBy' => 'nonexistent_column']))
        ->assertOk();

    $ids = array_column($response->json('data'), 'id');

    expect($ids[0])->toBeGreaterThan($ids[1]);
});

it('search filters by name', function () {
    User::factory()->create(['name' => 'UniqueTestName']);
    User::factory()->count(5)->create();

    $response = actingAsListUsers()
        ->getJson(route('users', ['search' => 'UniqueTestName']))
        ->assertOk();

    $data = $response->json('data');

    expect($data)->toHaveCount(1);
    expect($data[0]['name'])->toBe('UniqueTestName');
});

it('search by numeric id', function () {
    $target = User::factory()->create();
    User::factory()->count(5)->create();

    $response = actingAsListUsers()
        ->getJson(route('users', ['search' => $target->id]))
        ->assertOk();

    $ids = array_column($response->json('data'), 'id');

    expect($ids)->toContain($target->id);
});

it('per page limits results', function () {
    User::factory()->count(15)->create();

    $response = actingAsListUsers()
        ->getJson(route('users', ['perPage' => 10]))
        ->assertOk();

    expect($response->json('data'))->toHaveCount(10);
});

it('page 2 returns correct subset', function () {
    User::factory()->count(15)->create();

    $actor = User::factory()->create();
    $actor->givePermissionTo(Permissions::LIST_USERS->value);

    $page1 = $this->actingAs($actor)
        ->getJson(route('users', ['perPage' => 10, 'page' => 1]))
        ->assertOk();

    $page2 = $this->actingAs($actor)
        ->getJson(route('users', ['perPage' => 10, 'page' => 2]))
        ->assertOk();

    $page1Ids = array_column($page1->json('data'), 'id');
    $page2Ids = array_column($page2->json('data'), 'id');

    expect(array_intersect($page1Ids, $page2Ids))->toBeEmpty();
    expect($page2Ids)->not->toBeEmpty();
});

it('empty search returns all paginated', function () {
    User::factory()->count(5)->create();

    $response = actingAsListUsers()
        ->getJson(route('users', ['search' => '']))
        ->assertOk();

    // 5 created + 1 actor = 6
    expect($response->json('total'))->toBe(6);
});
