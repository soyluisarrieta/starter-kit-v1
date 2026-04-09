<?php

use App\Models\User;

it('guests cannot access setup password page', function () {
    $this->get(route('password.setup'))->assertRedirect(route('login'));
});

it('user with password is redirected away from setup page', function () {
    $user = User::factory()->create();

    $this->actingAs($user)
        ->get(route('password.setup'))
        ->assertRedirect(route('dashboard'));
});

it('sso-only user can access setup password page', function () {
    $user = User::factory()->withoutPassword()->create();

    $this->actingAs($user)
        ->get(route('password.setup'))
        ->assertOk();
});

it('sso-only user is forced to setup before accessing other pages', function () {
    $user = User::factory()->withoutPassword()->create();

    $this->actingAs($user)
        ->get(route('dashboard'))
        ->assertRedirect(route('password.setup'));
});

it('user with password can access dashboard', function () {
    $user = User::factory()->create();

    $this->actingAs($user)
        ->get(route('dashboard'))
        ->assertOk();
});

it('storing a password unlocks the account', function () {
    $user = User::factory()->withoutPassword()->create();

    $this->actingAs($user)
        ->post(route('password.setup.store'), [
            'password' => 'NewSecurePass123!',
            'password_confirmation' => 'NewSecurePass123!',
        ])
        ->assertRedirect(route('dashboard'));

    $user->refresh();
    expect($user->password_set_at)->not->toBeNull();
});

it('storing a password validates required fields', function () {
    $user = User::factory()->withoutPassword()->create();

    $this->actingAs($user)
        ->post(route('password.setup.store'), [])
        ->assertSessionHasErrors('password');

    expect($user->fresh()->password_set_at)->toBeNull();
});

it('storing a password validates confirmation match', function () {
    $user = User::factory()->withoutPassword()->create();

    $this->actingAs($user)
        ->post(route('password.setup.store'), [
            'password' => 'SecurePass123!',
            'password_confirmation' => 'Different123!',
        ])
        ->assertSessionHasErrors('password');

    expect($user->fresh()->password_set_at)->toBeNull();
});

it('user with password cannot re-trigger setup', function () {
    $user = User::factory()->create();
    $originalSetAt = $user->password_set_at;

    $this->actingAs($user)
        ->post(route('password.setup.store'), [
            'password' => 'NewSecurePass123!',
            'password_confirmation' => 'NewSecurePass123!',
        ])
        ->assertRedirect(route('dashboard'));

    $user->refresh();
    expect($user->password_set_at->timestamp)->toBe($originalSetAt->timestamp);
});
