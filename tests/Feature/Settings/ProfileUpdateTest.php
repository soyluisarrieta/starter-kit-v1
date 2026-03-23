<?php

use App\Models\User;

it('profile page is displayed', function () {
    $user = User::factory()->create();

    $this->actingAs($user)->get(route('profile.edit'))->assertOk();
});

it('profile information can be updated', function () {
    $user = User::factory()->create();

    $this->actingAs($user)
        ->patch(route('profile.update'), [
            'name' => 'Test Name',
            'last_name' => 'Test Last Name',
            'email' => 'test@example.com',
        ])->assertSessionHasNoErrors()->assertRedirect(route('profile.edit'));

    $user->refresh();

    expect($user->name)->toBe('Test Name');
    expect($user->last_name)->toBe('Test Last Name');
    expect($user->email)->toBe('test@example.com');
    expect($user->email_verified_at)->toBeNull();
});

it('email verification status is unchanged when the email address is unchanged', function () {
    $user = User::factory()->create();

    $this->actingAs($user)
        ->patch(route('profile.update'), [
            'name' => 'Test Name',
            'last_name' => 'Test Last Name',
            'email' => $user->email,
        ])->assertSessionHasNoErrors()->assertRedirect(route('profile.edit'));

    expect($user->refresh()->email_verified_at)->not->toBeNull();
});

it('user can delete their account', function () {
    $user = User::factory()->create();

    $this->actingAs($user)
        ->delete(route('profile.destroy'), ['password' => 'password'])
        ->assertSessionHasNoErrors()->assertRedirect(route('dashboard'));

    $this->assertGuest();
    expect($user->fresh())->toBeNull();
});

it('correct password must be provided to delete account', function () {
    $user = User::factory()->create();

    $this->actingAs($user)
        ->from(route('profile.edit'))
        ->delete(route('profile.destroy'), ['password' => 'wrong-password'])
        ->assertSessionHasErrors('password')->assertRedirect(route('profile.edit'));

    expect($user->fresh())->not->toBeNull();
});
