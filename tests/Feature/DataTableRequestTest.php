<?php

namespace Tests\Feature;

use App\Enums\Permissions;
use App\Models\User;
use Database\Seeders\PermissionSeeder;
use Database\Seeders\RoleSeeder;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class DataTableRequestTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();

        $this->seed(PermissionSeeder::class);
        $this->seed(RoleSeeder::class);
    }

    private function actingAsAdmin(): static
    {
        $user = User::factory()->create();
        $user->givePermissionTo(Permissions::LIST_USERS->value);

        return $this->actingAs($user);
    }

    public function test_index_works_without_query_params(): void
    {
        $this->actingAsAdmin()
            ->getJson(route('users'))
            ->assertOk();
    }

    public function test_per_page_accepts_allowed_values(): void
    {
        foreach ([10, 25, 50, 100] as $value) {
            $this->actingAsAdmin()
                ->getJson(route('users', ['perPage' => $value]))
                ->assertOk();
        }
    }

    public function test_per_page_rejects_arbitrary_value(): void
    {
        $this->actingAsAdmin()
            ->getJson(route('users', ['perPage' => 999]))
            ->assertJsonValidationErrors('perPage');
    }

    public function test_per_page_rejects_string_value(): void
    {
        $this->actingAsAdmin()
            ->getJson(route('users', ['perPage' => 'all']))
            ->assertJsonValidationErrors('perPage');
    }

    public function test_sort_order_accepts_asc_and_desc(): void
    {
        foreach (['asc', 'desc'] as $order) {
            $this->actingAsAdmin()
                ->getJson(route('users', ['sortOrder' => $order]))
                ->assertOk();
        }
    }

    public function test_sort_order_rejects_invalid_value(): void
    {
        $this->actingAsAdmin()
            ->getJson(route('users', ['sortOrder' => 'random']))
            ->assertJsonValidationErrors('sortOrder');
    }

    public function test_sort_by_with_non_sortable_column_falls_back_silently(): void
    {
        $this->actingAsAdmin()
            ->getJson(route('users', ['sortBy' => 'roleIds']))
            ->assertOk();
    }

    public function test_sort_by_rejects_non_alpha_value(): void
    {
        $this->actingAsAdmin()
            ->getJson(route('users', ['sortBy' => 'id; DROP TABLE users;']))
            ->assertJsonValidationErrors('sortBy');
    }

    public function test_search_accepts_normal_string(): void
    {
        $this->actingAsAdmin()
            ->getJson(route('users', ['search' => 'Luis']))
            ->assertOk();
    }

    public function test_search_rejects_string_over_100_chars(): void
    {
        $this->actingAsAdmin()
            ->getJson(route('users', ['search' => str_repeat('a', 101)]))
            ->assertJsonValidationErrors('search');
    }
}
