<?php

use App\Http\Middleware\EnsurePasswordIsSet;
use App\Models\User;
use Laravel\Socialite\Facades\Socialite;
use Laravel\Socialite\Two\User as SocialiteUser;

function ssoMockUser(string $id = '999', string $email = 'sso@example.com'): SocialiteUser
{
    $mock = Mockery::mock(SocialiteUser::class)->makePartial();
    $mock->id = $id;
    $mock->email = $email;
    $mock->avatar = null;
    $mock->user = ['given_name' => 'Test', 'family_name' => 'User'];

    return $mock;
}

it('guests cannot access connected accounts page', function () {
    $this->get(route('connected-accounts.edit'))->assertRedirect(route('login'));
});

it('shows connected accounts page for authenticated user', function () {
    $user = User::factory()->create();

    $this->actingAs($user)
        ->get(route('connected-accounts.edit'))
        ->assertOk()
        ->assertInertia(fn ($page) => $page
            ->component('settings/connected-accounts')
            ->where('connectedProvider', null)
            ->where('canDisconnect', true)
        );
});

it('shows linked provider when user has sso', function () {
    $user = User::factory()->create([
        'sso_id' => '123',
        'sso_provider' => 'google',
    ]);

    $this->actingAs($user)
        ->get(route('connected-accounts.edit'))
        ->assertInertia(fn ($page) => $page
            ->where('connectedProvider', 'google')
            ->where('canDisconnect', true)
        );
});

it('sso-only user is forced to setup password before viewing connected accounts', function () {
    $user = User::factory()->withoutPassword()->create([
        'sso_id' => '123',
        'sso_provider' => 'google',
    ]);

    $this->actingAs($user)
        ->get(route('connected-accounts.edit'))
        ->assertRedirect(route('password.setup'));
});

it('link initiates sso flow with intent stored in session', function () {
    $user = User::factory()->create();

    Socialite::shouldReceive('driver')
        ->with('google')
        ->andReturn(Mockery::mock(['redirect' => redirect('https://google.com')]));

    $this->actingAs($user)
        ->get(route('connected-accounts.link', 'google'))
        ->assertRedirect();

    expect(session('socialite_intent'))->toBe('link');
});

it('link callback associates sso with current user', function () {
    $user = User::factory()->create();

    $driver = Mockery::mock();
    $driver->shouldReceive('user')->andReturn(ssoMockUser('555', 'other@example.com'));
    Socialite::shouldReceive('driver')->with('google')->andReturn($driver);

    $this->actingAs($user)
        ->withSession(['socialite_intent' => 'link'])
        ->get(route('connected-accounts.link-callback', 'google'))
        ->assertRedirect(route('connected-accounts.edit'))
        ->assertSessionHas('success');

    $user->refresh();
    expect($user->sso_id)->toBe('555');
    expect($user->sso_provider)->toBe('google');
});

it('link callback rejects when intent flag missing', function () {
    $user = User::factory()->create();

    $this->actingAs($user)
        ->get(route('connected-accounts.link-callback', 'google'))
        ->assertRedirect(route('connected-accounts.edit'))
        ->assertSessionHas('error');

    expect($user->fresh()->sso_id)->toBeNull();
});

it('link callback rejects when sso identity already taken', function () {
    User::factory()->create([
        'sso_id' => '777',
        'sso_provider' => 'google',
    ]);
    $user = User::factory()->create();

    $driver = Mockery::mock();
    $driver->shouldReceive('user')->andReturn(ssoMockUser('777'));
    Socialite::shouldReceive('driver')->with('google')->andReturn($driver);

    $this->actingAs($user)
        ->withSession(['socialite_intent' => 'link'])
        ->get(route('connected-accounts.link-callback', 'google'))
        ->assertRedirect(route('connected-accounts.edit'))
        ->assertSessionHas('error');

    expect($user->fresh()->sso_id)->toBeNull();
});

it('destroy unlinks sso when user has password', function () {
    $user = User::factory()->create([
        'sso_id' => '123',
        'sso_provider' => 'google',
    ]);

    $this->actingAs($user)
        ->delete(route('connected-accounts.destroy'))
        ->assertRedirect(route('connected-accounts.edit'))
        ->assertSessionHas('success');

    $user->refresh();
    expect($user->sso_id)->toBeNull();
    expect($user->sso_provider)->toBeNull();
});

it('destroy is blocked when user has no password', function () {
    $user = User::factory()->withoutPassword()->create([
        'sso_id' => '123',
        'sso_provider' => 'google',
    ]);

    // bypass the EnsurePasswordIsSet middleware by acting after auth
    $this->actingAs($user);
    $user->password_set_at = null;
    $user->save();

    $this->withoutMiddleware(EnsurePasswordIsSet::class)
        ->delete(route('connected-accounts.destroy'))
        ->assertRedirect(route('connected-accounts.edit'))
        ->assertSessionHas('error');

    expect($user->fresh()->sso_id)->toBe('123');
});
