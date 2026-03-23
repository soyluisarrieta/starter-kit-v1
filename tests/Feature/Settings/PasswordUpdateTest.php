<?php

use App\Models\User;
use Illuminate\Support\Facades\Hash;

it('password update page is displayed', function () {
    $user = User::factory()->create();

    $this->actingAs($user)->get(route('user-password.edit'))->assertOk();
});

it('password can be updated', function () {
    $user = User::factory()->create();

    $this->actingAs($user)
        ->from(route('user-password.edit'))
        ->put(route('user-password.update'), [
            'current_password' => 'password',
            'password' => 'new-password',
            'password_confirmation' => 'new-password',
        ])->assertSessionHasNoErrors()->assertRedirect(route('user-password.edit'));

    expect(Hash::check('new-password', $user->refresh()->password))->toBeTrue();
});

it('correct password must be provided to update password', function () {
    $user = User::factory()->create();

    $this->actingAs($user)
        ->from(route('user-password.edit'))
        ->put(route('user-password.update'), [
            'current_password' => 'wrong-password',
            'password' => 'new-password',
            'password_confirmation' => 'new-password',
        ])->assertSessionHasErrors('current_password')->assertRedirect(route('user-password.edit'));
});
