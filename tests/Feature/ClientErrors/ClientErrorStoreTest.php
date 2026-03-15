<?php

namespace Tests\Feature\ClientErrors;

use App\Models\ClientError;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class ClientErrorStoreTest extends TestCase
{
    use RefreshDatabase;

    private function validPayload(array $overrides = []): array
    {
        return [
            'message' => 'Cannot read properties of undefined',
            'stack' => "Error: Cannot read properties of undefined\n    at UserList (http://localhost/assets/app.js:142:15)",
            'component_stack' => "\n    at UserList\n    at Dashboard\n    at App",
            'url' => 'http://localhost/dashboard',
            ...$overrides,
        ];
    }

    public function test_guest_can_report_error(): void
    {
        $response = $this->postJson(route('client-errors.store'), $this->validPayload());

        $response->assertNoContent();

        $this->assertDatabaseHas('client_errors', [
            'message' => 'Cannot read properties of undefined',
            'user_id' => null,
        ]);
    }

    public function test_authenticated_user_is_associated(): void
    {
        $user = User::factory()->create();

        $this->actingAs($user)
            ->postJson(route('client-errors.store'), $this->validPayload())
            ->assertNoContent();

        $this->assertDatabaseHas('client_errors', [
            'message' => 'Cannot read properties of undefined',
            'user_id' => $user->id,
        ]);
    }

    public function test_duplicate_error_increments_occurrences(): void
    {
        $payload = $this->validPayload();

        $this->postJson(route('client-errors.store'), $payload)->assertNoContent();
        $this->postJson(route('client-errors.store'), $payload)->assertNoContent();

        $this->assertDatabaseCount('client_errors', 1);

        $error = ClientError::first();
        $this->assertEquals(2, $error->occurrences);
    }

    public function test_duplicate_error_updates_last_seen_at(): void
    {
        $payload = $this->validPayload();

        $this->postJson(route('client-errors.store'), $payload)->assertNoContent();

        $error = ClientError::first();
        $originalLastSeen = $error->last_seen_at;

        $this->travel(5)->minutes();

        $this->postJson(route('client-errors.store'), $payload)->assertNoContent();

        $error->refresh();
        $this->assertTrue($error->last_seen_at->gt($originalLastSeen));
    }

    public function test_fingerprint_ignores_line_numbers(): void
    {
        $payload1 = $this->validPayload([
            'stack' => "Error: fail\n    at Component (http://localhost/app.js:100:10)",
        ]);

        $payload2 = $this->validPayload([
            'stack' => "Error: fail\n    at Component (http://localhost/app.js:200:20)",
        ]);

        $this->postJson(route('client-errors.store'), $payload1)->assertNoContent();
        $this->postJson(route('client-errors.store'), $payload2)->assertNoContent();

        // Same message + normalized stack → same fingerprint → 1 record
        $this->assertDatabaseCount('client_errors', 1);
    }

    public function test_different_messages_create_separate_records(): void
    {
        $this->postJson(route('client-errors.store'), $this->validPayload([
            'message' => 'Error A',
        ]))->assertNoContent();

        $this->postJson(route('client-errors.store'), $this->validPayload([
            'message' => 'Error B',
        ]))->assertNoContent();

        $this->assertDatabaseCount('client_errors', 2);
    }

    public function test_message_is_required(): void
    {
        $this->postJson(route('client-errors.store'), $this->validPayload([
            'message' => '',
        ]))->assertUnprocessable()
            ->assertJsonValidationErrors('message');
    }

    public function test_url_is_required(): void
    {
        $this->postJson(route('client-errors.store'), $this->validPayload([
            'url' => '',
        ]))->assertUnprocessable()
            ->assertJsonValidationErrors('url');
    }

    public function test_stack_is_nullable(): void
    {
        $this->postJson(route('client-errors.store'), $this->validPayload([
            'stack' => null,
        ]))->assertNoContent();

        $this->assertDatabaseCount('client_errors', 1);
    }

    public function test_component_stack_is_nullable(): void
    {
        $this->postJson(route('client-errors.store'), $this->validPayload([
            'component_stack' => null,
        ]))->assertNoContent();

        $this->assertDatabaseCount('client_errors', 1);
    }

    public function test_message_max_length_is_500(): void
    {
        $this->postJson(route('client-errors.store'), $this->validPayload([
            'message' => str_repeat('a', 501),
        ]))->assertUnprocessable()
            ->assertJsonValidationErrors('message');
    }

    public function test_stack_max_length_is_10000(): void
    {
        $this->postJson(route('client-errors.store'), $this->validPayload([
            'stack' => str_repeat('a', 10001),
        ]))->assertUnprocessable()
            ->assertJsonValidationErrors('stack');
    }

    public function test_url_max_length_is_2048(): void
    {
        $this->postJson(route('client-errors.store'), $this->validPayload([
            'url' => 'http://localhost/' . str_repeat('a', 2040),
        ]))->assertUnprocessable()
            ->assertJsonValidationErrors('url');
    }
}
