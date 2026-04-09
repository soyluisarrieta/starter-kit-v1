<?php

use App\Models\ClientError;
use App\Models\User;
use Illuminate\Database\QueryException;

it('client error can be created', function () {
    $error = createClientError(['message' => 'Cannot read properties of undefined']);

    $this->assertDatabaseHas('client_errors', [
        'id' => $error->id,
        'message' => 'Cannot read properties of undefined',
        'occurrences' => 1,
    ]);
});

it('fingerprint is unique', function () {
    createClientError(['fingerprint' => 'abc123']);

    expect(fn () => createClientError(['fingerprint' => 'abc123']))
        ->toThrow(QueryException::class);
});

it('user relationship', function () {
    $user = User::factory()->create();
    $error = createClientError(['user_id' => $user->id]);

    expect($error->user->is($user))->toBeTrue();
});

it('user is nullable', function () {
    $error = createClientError(['user_id' => null]);

    expect($error->user)->toBeNull();
});

it('component stack is nullable', function () {
    $error = createClientError(['component_stack' => null]);

    expect($error->component_stack)->toBeNull();
});

it('resolved at is nullable', function () {
    $error = createClientError();

    expect($error->resolved_at)->toBeNull();
});

it('timestamps are cast to datetime', function () {
    $error = createClientError([
        'first_seen_at' => '2026-01-15 10:00:00',
        'last_seen_at' => '2026-01-15 12:00:00',
        'resolved_at' => '2026-01-15 14:00:00',
    ]);

    $error->refresh();

    expect($error->first_seen_at)->toBeInstanceOf(DateTimeInterface::class);
    expect($error->last_seen_at)->toBeInstanceOf(DateTimeInterface::class);
    expect($error->resolved_at)->toBeInstanceOf(DateTimeInterface::class);
});

it('unresolved scope', function () {
    createClientError(['resolved_at' => null]);
    createClientError(['resolved_at' => null]);
    createClientError(['resolved_at' => now()]);

    expect(ClientError::unresolved()->get())->toHaveCount(2);
});

it('frequent scope with default threshold', function () {
    createClientError(['occurrences' => 10]);
    createClientError(['occurrences' => 15]);
    createClientError(['occurrences' => 5]);

    expect(ClientError::frequent()->get())->toHaveCount(2);
});

it('frequent scope with custom threshold', function () {
    createClientError(['occurrences' => 20]);
    createClientError(['occurrences' => 10]);
    createClientError(['occurrences' => 5]);

    expect(ClientError::frequent(15)->get())->toHaveCount(1);
});

it('user deletion nullifies client error', function () {
    $user = User::factory()->create();
    $error = createClientError(['user_id' => $user->id]);

    $user->delete();

    expect($error->fresh()->user_id)->toBeNull();
});
