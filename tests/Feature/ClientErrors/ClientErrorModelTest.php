<?php

namespace Tests\Feature\ClientErrors;

use App\Models\ClientError;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class ClientErrorModelTest extends TestCase
{
    use RefreshDatabase;

    private function createClientError(array $attributes = []): ClientError
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

    public function test_client_error_can_be_created(): void
    {
        $error = $this->createClientError([
            'message' => 'Cannot read properties of undefined',
        ]);

        $this->assertDatabaseHas('client_errors', [
            'id' => $error->id,
            'message' => 'Cannot read properties of undefined',
            'occurrences' => 1,
        ]);
    }

    public function test_fingerprint_is_unique(): void
    {
        $this->createClientError(['fingerprint' => 'abc123']);

        $this->expectException(\Illuminate\Database\QueryException::class);

        $this->createClientError(['fingerprint' => 'abc123']);
    }

    public function test_user_relationship(): void
    {
        $user = User::factory()->create();

        $error = $this->createClientError(['user_id' => $user->id]);

        $this->assertTrue($error->user->is($user));
    }

    public function test_user_is_nullable(): void
    {
        $error = $this->createClientError(['user_id' => null]);

        $this->assertNull($error->user);
    }

    public function test_component_stack_is_nullable(): void
    {
        $error = $this->createClientError(['component_stack' => null]);

        $this->assertNull($error->component_stack);
    }

    public function test_resolved_at_is_nullable(): void
    {
        $error = $this->createClientError();

        $this->assertNull($error->resolved_at);
    }

    public function test_timestamps_are_cast_to_datetime(): void
    {
        $error = $this->createClientError([
            'first_seen_at' => '2026-01-15 10:00:00',
            'last_seen_at' => '2026-01-15 12:00:00',
            'resolved_at' => '2026-01-15 14:00:00',
        ]);

        $error->refresh();

        $this->assertInstanceOf(\DateTimeInterface::class, $error->first_seen_at);
        $this->assertInstanceOf(\DateTimeInterface::class, $error->last_seen_at);
        $this->assertInstanceOf(\DateTimeInterface::class, $error->resolved_at);
    }

    public function test_unresolved_scope(): void
    {
        $this->createClientError(['resolved_at' => null]);
        $this->createClientError(['resolved_at' => null]);
        $this->createClientError(['resolved_at' => now()]);

        $this->assertCount(2, ClientError::unresolved()->get());
    }

    public function test_frequent_scope_with_default_threshold(): void
    {
        $this->createClientError(['occurrences' => 10]);
        $this->createClientError(['occurrences' => 15]);
        $this->createClientError(['occurrences' => 5]);

        $this->assertCount(2, ClientError::frequent()->get());
    }

    public function test_frequent_scope_with_custom_threshold(): void
    {
        $this->createClientError(['occurrences' => 20]);
        $this->createClientError(['occurrences' => 10]);
        $this->createClientError(['occurrences' => 5]);

        $this->assertCount(1, ClientError::frequent(15)->get());
    }

    public function test_user_deletion_nullifies_client_error(): void
    {
        $user = User::factory()->create();
        $error = $this->createClientError(['user_id' => $user->id]);

        $user->delete();

        $error->refresh();
        $this->assertNull($error->user_id);
    }
}
