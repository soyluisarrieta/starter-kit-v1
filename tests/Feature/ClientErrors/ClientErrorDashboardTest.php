<?php

namespace Tests\Feature\ClientErrors;

use App\Enums\Permissions;
use App\Models\ClientError;
use App\Models\User;
use Database\Seeders\PermissionSeeder;
use Database\Seeders\RoleSeeder;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class ClientErrorDashboardTest extends TestCase
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
        $user->givePermissionTo(Permissions::MANAGE_ERRORS->value);

        return $this->actingAs($user);
    }

    private function createClientError(array $attributes = []): ClientError
    {
        return ClientError::create([
            'fingerprint' => $attributes['fingerprint'] ?? fake()->sha256(),
            'message' => $attributes['message'] ?? 'Test error',
            'stack' => $attributes['stack'] ?? 'Error: Test\n    at Component',
            'url' => $attributes['url'] ?? 'http://localhost/dashboard',
            'first_seen_at' => $attributes['first_seen_at'] ?? now(),
            'last_seen_at' => $attributes['last_seen_at'] ?? now(),
            ...$attributes,
        ]);
    }

    // --- Index ---

    public function test_guests_redirected_to_login(): void
    {
        $this->get(route('errors.index'))->assertRedirect(route('login'));
    }

    public function test_without_permission_returns_403(): void
    {
        $this->actingAs(User::factory()->create())
            ->get(route('errors.index'))
            ->assertForbidden();
    }

    public function test_with_permission_returns_ok(): void
    {
        $this->actingAsWithPermission()
            ->get(route('errors.index'))
            ->assertOk();
    }

    public function test_json_returns_paginated_errors(): void
    {
        $this->createClientError(['message' => 'Error A']);
        $this->createClientError(['message' => 'Error B']);

        $response = $this->actingAsWithPermission()
            ->getJson(route('errors.index'))
            ->assertOk()
            ->assertJsonStructure(['data', 'current_page', 'per_page', 'total']);

        $this->assertEquals(2, $response->json('total'));
    }

    public function test_json_includes_user_name(): void
    {
        $user = User::factory()->create(['name' => 'Jane']);
        $this->createClientError(['user_id' => $user->id]);

        $response = $this->actingAsWithPermission()
            ->getJson(route('errors.index'))
            ->assertOk();

        $this->assertEquals('Jane', $response->json('data.0.user.name'));
    }

    public function test_default_sort_is_last_seen_at_desc(): void
    {
        $old = $this->createClientError(['last_seen_at' => now()->subHour()]);
        $recent = $this->createClientError(['last_seen_at' => now()]);

        $response = $this->actingAsWithPermission()
            ->getJson(route('errors.index'))
            ->assertOk();

        $ids = array_column($response->json('data'), 'id');
        $this->assertEquals($recent->id, $ids[0]);
    }

    // --- Resolve ---

    public function test_resolve_marks_error_as_resolved(): void
    {
        $error = $this->createClientError();

        $this->actingAsWithPermission()
            ->patch(route('errors.resolve', $error))
            ->assertRedirect();

        $error->refresh();
        $this->assertNotNull($error->resolved_at);
    }

    public function test_resolve_clears_reopened_at(): void
    {
        $error = $this->createClientError(['reopened_at' => now()]);

        $this->actingAsWithPermission()
            ->patch(route('errors.resolve', $error));

        $error->refresh();
        $this->assertNotNull($error->resolved_at);
        $this->assertNull($error->reopened_at);
    }

    public function test_reopen_sets_reopened_at(): void
    {
        $error = $this->createClientError(['resolved_at' => now()]);

        $this->actingAsWithPermission()
            ->patch(route('errors.resolve', $error));

        $error->refresh();
        $this->assertNull($error->resolved_at);
        $this->assertNotNull($error->reopened_at);
    }

    public function test_resolve_without_permission_returns_403(): void
    {
        $error = $this->createClientError();

        $this->actingAs(User::factory()->create())
            ->patch(route('errors.resolve', $error))
            ->assertForbidden();
    }

    // --- Destroy ---

    public function test_destroy_deletes_error(): void
    {
        $error = $this->createClientError();

        $this->actingAsWithPermission()
            ->delete(route('errors.destroy', $error))
            ->assertRedirect();

        $this->assertDatabaseMissing('client_errors', ['id' => $error->id]);
    }

    public function test_destroy_without_permission_returns_403(): void
    {
        $error = $this->createClientError();

        $this->actingAs(User::factory()->create())
            ->delete(route('errors.destroy', $error))
            ->assertForbidden();
    }
}
