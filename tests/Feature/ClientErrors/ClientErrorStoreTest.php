<?php

use App\Models\ClientError;
use App\Models\User;

function clientErrorStorePayload(array $overrides = []): array
{
    return [
        'message' => 'Cannot read properties of undefined',
        'stack' => "Error: Cannot read properties of undefined\n    at UserList (http://localhost/assets/app.js:142:15)",
        'component_stack' => "\n    at UserList\n    at Dashboard\n    at App",
        'url' => 'http://localhost/dashboard',
        ...$overrides,
    ];
}

it('guest can report error', function () {
    $this->postJson(route('client-errors.store'), clientErrorStorePayload())
        ->assertNoContent();

    $this->assertDatabaseHas('client_errors', [
        'message' => 'Cannot read properties of undefined',
        'user_id' => null,
    ]);
});

it('authenticated user is associated', function () {
    $user = User::factory()->create();

    $this->actingAs($user)
        ->postJson(route('client-errors.store'), clientErrorStorePayload())
        ->assertNoContent();

    $this->assertDatabaseHas('client_errors', [
        'message' => 'Cannot read properties of undefined',
        'user_id' => $user->id,
    ]);
});

it('captures user agent and environment from server', function () {
    $this->withHeader('User-Agent', 'TestBrowser/1.0')
        ->postJson(route('client-errors.store'), clientErrorStorePayload())
        ->assertNoContent();

    $error = ClientError::first();
    expect($error->user_agent)->toBe('TestBrowser/1.0');
    expect($error->environment)->toBe(config('app.env'));
});

it('redacts sensitive query parameters from stored url', function () {
    $this->postJson(route('client-errors.store'), clientErrorStorePayload([
        'url' => 'https://app.test/dashboard?token=secret123&page=2&api_key=xyz',
    ]))->assertNoContent();

    $error = ClientError::first();
    expect($error->url)->toContain('token=%5Bredacted%5D');
    expect($error->url)->toContain('api_key=%5Bredacted%5D');
    expect($error->url)->toContain('page=2');
    expect($error->url)->not->toContain('secret123');
    expect($error->url)->not->toContain('xyz');
});

it('preserves urls without query parameters', function () {
    $this->postJson(route('client-errors.store'), clientErrorStorePayload([
        'url' => 'https://app.test/dashboard',
    ]))->assertNoContent();

    $error = ClientError::first();
    expect($error->url)->toBe('https://app.test/dashboard');
});

it('duplicate error increments occurrences', function () {
    $payload = clientErrorStorePayload();

    $this->postJson(route('client-errors.store'), $payload)->assertNoContent();
    $this->postJson(route('client-errors.store'), $payload)->assertNoContent();

    $this->assertDatabaseCount('client_errors', 1);

    expect(ClientError::first()->occurrences)->toBe(2);
});

it('duplicate error updates last seen at', function () {
    $payload = clientErrorStorePayload();

    $this->postJson(route('client-errors.store'), $payload)->assertNoContent();

    $error = ClientError::first();
    $originalLastSeen = $error->last_seen_at;

    $this->travel(5)->minutes();

    $this->postJson(route('client-errors.store'), $payload)->assertNoContent();

    expect($error->fresh()->last_seen_at->gt($originalLastSeen))->toBeTrue();
});

it('duplicate error reopens resolved error', function () {
    $payload = clientErrorStorePayload();

    $this->postJson(route('client-errors.store'), $payload)->assertNoContent();

    $error = ClientError::first();
    $error->update(['resolved_at' => now()]);
    expect($error->fresh()->resolved_at)->not->toBeNull();

    $this->postJson(route('client-errors.store'), $payload)->assertNoContent();

    $error->refresh();
    expect($error->resolved_at)->toBeNull();
    expect($error->reopened_at)->not->toBeNull();
});

it('duplicate error does not reopen if not resolved', function () {
    $payload = clientErrorStorePayload();

    $this->postJson(route('client-errors.store'), $payload)->assertNoContent();
    $this->postJson(route('client-errors.store'), $payload)->assertNoContent();

    expect(ClientError::first()->reopened_at)->toBeNull();
});

it('fingerprint based on message only', function () {
    $payload1 = clientErrorStorePayload([
        'stack' => "Error: fail\n    at Component (http://localhost/app.js:100:10)",
    ]);

    $payload2 = clientErrorStorePayload([
        'stack' => "Error: fail\n    at OtherComponent (http://localhost/other.js:999:1)",
    ]);

    $this->postJson(route('client-errors.store'), $payload1)->assertNoContent();
    $this->postJson(route('client-errors.store'), $payload2)->assertNoContent();

    // Same message → same fingerprint → 1 record (stack differs but doesn't matter)
    $this->assertDatabaseCount('client_errors', 1);
});

it('different messages create separate records', function () {
    $this->postJson(route('client-errors.store'), clientErrorStorePayload(['message' => 'Error A']))->assertNoContent();
    $this->postJson(route('client-errors.store'), clientErrorStorePayload(['message' => 'Error B']))->assertNoContent();

    $this->assertDatabaseCount('client_errors', 2);
});

it('message is required', function () {
    $this->postJson(route('client-errors.store'), clientErrorStorePayload(['message' => '']))
        ->assertUnprocessable()
        ->assertJsonValidationErrors('message');
});

it('url is required', function () {
    $this->postJson(route('client-errors.store'), clientErrorStorePayload(['url' => '']))
        ->assertUnprocessable()
        ->assertJsonValidationErrors('url');
});

it('stack is nullable', function () {
    $this->postJson(route('client-errors.store'), clientErrorStorePayload(['stack' => null]))
        ->assertNoContent();

    $this->assertDatabaseCount('client_errors', 1);
});

it('component stack is nullable', function () {
    $this->postJson(route('client-errors.store'), clientErrorStorePayload(['component_stack' => null]))
        ->assertNoContent();

    $this->assertDatabaseCount('client_errors', 1);
});

it('message max length is 500', function () {
    $this->postJson(route('client-errors.store'), clientErrorStorePayload(['message' => str_repeat('a', 501)]))
        ->assertUnprocessable()
        ->assertJsonValidationErrors('message');
});

it('stack max length is 10000', function () {
    $this->postJson(route('client-errors.store'), clientErrorStorePayload(['stack' => str_repeat('a', 10001)]))
        ->assertUnprocessable()
        ->assertJsonValidationErrors('stack');
});

it('url max length is 2048', function () {
    $this->postJson(route('client-errors.store'), clientErrorStorePayload(['url' => 'http://localhost/'.str_repeat('a', 2040)]))
        ->assertUnprocessable()
        ->assertJsonValidationErrors('url');
});
