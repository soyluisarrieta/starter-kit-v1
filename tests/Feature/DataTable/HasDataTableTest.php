<?php

namespace Tests\Feature\DataTable;

use App\Enums\Permissions;
use App\Models\User;
use Database\Seeders\PermissionSeeder;
use Database\Seeders\RoleSeeder;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class HasDataTableTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();

        $this->seed(PermissionSeeder::class);
        $this->seed(RoleSeeder::class);
    }

    private function actingAsWithPermission(): static
    {
        $user = User::factory()->create();
        $user->givePermissionTo(Permissions::LIST_USERS->value);

        return $this->actingAs($user);
    }

    public function test_default_sort_is_id_desc(): void
    {
        User::factory()->count(2)->create();

        $response = $this->actingAsWithPermission()
            ->getJson(route('users'))
            ->assertOk();

        $ids = array_column($response->json('data'), 'id');

        // Default sort: id desc → last created first
        $this->assertTrue($ids[0] > $ids[1]);
    }

    public function test_sort_by_name_asc(): void
    {
        User::factory()->create(['name' => 'Zara']);
        User::factory()->create(['name' => 'Alice']);

        $response = $this->actingAsWithPermission()
            ->getJson(route('users', ['sortBy' => 'name', 'sortOrder' => 'asc']))
            ->assertOk();

        $names = array_column($response->json('data'), 'name');

        $this->assertEquals($names, collect($names)->sort()->values()->all());
    }

    public function test_invalid_sort_column_falls_back_to_default(): void
    {
        User::factory()->count(3)->create();

        $response = $this->actingAsWithPermission()
            ->getJson(route('users', ['sortBy' => 'nonexistent_column']))
            ->assertOk();

        // Falls back to id desc — should still return data without error
        $ids = array_column($response->json('data'), 'id');
        $this->assertTrue($ids[0] > $ids[1]);
    }

    public function test_search_filters_by_name(): void
    {
        User::factory()->create(['name' => 'UniqueTestName']);
        User::factory()->count(5)->create();

        $response = $this->actingAsWithPermission()
            ->getJson(route('users', ['search' => 'UniqueTestName']))
            ->assertOk();

        $data = $response->json('data');

        $this->assertCount(1, $data);
        $this->assertEquals('UniqueTestName', $data[0]['name']);
    }

    public function test_search_by_numeric_id(): void
    {
        $target = User::factory()->create();
        User::factory()->count(5)->create();

        $response = $this->actingAsWithPermission()
            ->getJson(route('users', ['search' => $target->id]))
            ->assertOk();

        $ids = array_column($response->json('data'), 'id');

        $this->assertContains($target->id, $ids);
    }

    public function test_per_page_limits_results(): void
    {
        User::factory()->count(15)->create();

        $response = $this->actingAsWithPermission()
            ->getJson(route('users', ['perPage' => 10]))
            ->assertOk();

        $this->assertCount(10, $response->json('data'));
    }

    public function test_page_2_returns_correct_subset(): void
    {
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

        // Pages should have no overlap
        $this->assertEmpty(array_intersect($page1Ids, $page2Ids));
        // Page 2 should have the remaining users
        $this->assertNotEmpty($page2Ids);
    }

    public function test_empty_search_returns_all_paginated(): void
    {
        User::factory()->count(5)->create();

        $response = $this->actingAsWithPermission()
            ->getJson(route('users', ['search' => '']))
            ->assertOk();

        // 5 created + 1 actor = 6
        $this->assertEquals(6, $response->json('total'));
    }
}
