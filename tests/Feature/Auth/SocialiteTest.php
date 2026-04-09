<?php

use App\Models\User;
use Laravel\Socialite\Facades\Socialite;
use Laravel\Socialite\Two\User as SocialiteUser;
use Mockery\MockInterface;

function socialiteMockUser(array $overrides = []): MockInterface
{
    $mock = Mockery::mock(SocialiteUser::class)->makePartial();
    $mock->id = $overrides['id'] ?? '123456';
    $mock->email = $overrides['email'] ?? 'sso@example.com';
    $mock->avatar = $overrides['avatar'] ?? null;
    $mock->user = $overrides['user'] ?? [
        'given_name' => 'John',
        'family_name' => 'Doe',
    ];

    return $mock;
}

function socialiteMockDriver(MockInterface $socialiteUser): void
{
    $driver = Mockery::mock();
    $driver->shouldReceive('user')->andReturn($socialiteUser);

    Socialite::shouldReceive('driver')->with('google')->andReturn($driver);
}

it('redirects to provider', function () {
    $this->get(route('auth.sso.redirect', 'google'))->assertRedirect();
});

it('callback creates new sso user with null password and redirects to setup', function () {
    socialiteMockDriver(socialiteMockUser());

    $this->get(route('auth.sso.callback', 'google'))
        ->assertRedirect(route('password.setup'));

    $this->assertDatabaseHas('users', [
        'email' => 'sso@example.com',
        'sso_id' => '123456',
        'sso_provider' => 'google',
        'name' => 'John',
        'last_name' => 'Doe',
        'password_set_at' => null,
    ]);

    $this->assertAuthenticated();
});

it('callback rejects sso when email exists without sso link', function () {
    User::factory()->create(['email' => 'sso@example.com']);

    socialiteMockDriver(socialiteMockUser());

    $this->get(route('auth.sso.callback', 'google'))
        ->assertRedirect(route('login'))
        ->assertSessionHas('error');

    $this->assertGuest();
    $this->assertDatabaseMissing('users', [
        'email' => 'sso@example.com',
        'sso_id' => '123456',
    ]);
});

it('callback logs in existing sso user', function () {
    $existing = User::factory()->create([
        'email' => 'sso@example.com',
        'sso_id' => '123456',
        'sso_provider' => 'google',
    ]);

    socialiteMockDriver(socialiteMockUser());

    $this->get(route('auth.sso.callback', 'google'))
        ->assertRedirect(route('dashboard'));

    $this->assertAuthenticatedAs($existing);
});

it('callback redirects to login on failure', function () {
    $driver = Mockery::mock();
    $driver->shouldReceive('user')->andThrow(new Exception('OAuth error'));

    Socialite::shouldReceive('driver')->with('google')->andReturn($driver);

    $this->get(route('auth.sso.callback', 'google'))
        ->assertRedirect(route('login'))
        ->assertSessionHas('error');
});

it('callback redirects to login when no email', function () {
    $socialiteUser = Mockery::mock(SocialiteUser::class);
    $socialiteUser->shouldReceive('getEmail')->andReturnNull();
    $socialiteUser->shouldReceive('getId')->andReturn('123456');
    $socialiteUser->email = null;
    $socialiteUser->user = [];

    socialiteMockDriver($socialiteUser);

    $this->get(route('auth.sso.callback', 'google'))
        ->assertRedirect(route('login'))
        ->assertSessionHas('error');
});

it('avatar download failure does not prevent user creation', function () {
    socialiteMockDriver(socialiteMockUser(['avatar' => 'https://invalid-url.test/avatar.jpg']));

    $this->get(route('auth.sso.callback', 'google'))
        ->assertRedirect(route('password.setup'));

    $this->assertDatabaseHas('users', ['email' => 'sso@example.com']);
    $this->assertAuthenticated();
});
