<?php

namespace Tests\Feature\Auth;

use App\Models\User;
use Exception;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Laravel\Socialite\Facades\Socialite;
use Laravel\Socialite\Two\User as SocialiteUser;
use Mockery;
use Mockery\MockInterface;
use Tests\TestCase;

class SocialiteTest extends TestCase
{
    use RefreshDatabase;

    private function mockSocialiteUser(array $overrides = []): MockInterface
    {
        $id = $overrides['id'] ?? '123456';
        $email = $overrides['email'] ?? 'sso@example.com';
        $avatar = $overrides['avatar'] ?? null;
        $user = $overrides['user'] ?? [
            'given_name' => 'John',
            'family_name' => 'Doe',
        ];

        $mock = Mockery::mock(SocialiteUser::class)->makePartial();
        $mock->id = $id;
        $mock->email = $email;
        $mock->avatar = $avatar;
        $mock->user = $user;

        return $mock;
    }

    private function mockSocialiteDriver(MockInterface $socialiteUser): void
    {
        $driver = Mockery::mock();
        $driver->shouldReceive('user')->andReturn($socialiteUser);

        Socialite::shouldReceive('driver')->with('google')->andReturn($driver);
    }

    public function test_redirect_to_provider(): void
    {
        $this->get(route('auth.sso.redirect', 'google'))
            ->assertRedirect();
    }

    public function test_callback_creates_new_user(): void
    {
        $socialiteUser = $this->mockSocialiteUser();
        $this->mockSocialiteDriver($socialiteUser);

        $this->get(route('auth.sso.callback', 'google'))
            ->assertRedirect(route('dashboard'));

        $this->assertDatabaseHas('users', [
            'email' => 'sso@example.com',
            'sso_id' => '123456',
            'sso_provider' => 'google',
            'name' => 'John',
            'last_name' => 'Doe',
        ]);

        $this->assertAuthenticated();
    }

    public function test_callback_links_existing_user_by_email(): void
    {
        $existing = User::factory()->create(['email' => 'sso@example.com']);

        $socialiteUser = $this->mockSocialiteUser();
        $this->mockSocialiteDriver($socialiteUser);

        $this->get(route('auth.sso.callback', 'google'))
            ->assertRedirect(route('dashboard'));

        $existing->refresh();
        $this->assertEquals('123456', $existing->sso_id);
        $this->assertEquals('google', $existing->sso_provider);
        $this->assertAuthenticated();
    }

    public function test_callback_logs_in_existing_sso_user(): void
    {
        $existing = User::factory()->create([
            'email' => 'sso@example.com',
            'sso_id' => '123456',
            'sso_provider' => 'google',
        ]);

        $socialiteUser = $this->mockSocialiteUser();
        $this->mockSocialiteDriver($socialiteUser);

        $this->get(route('auth.sso.callback', 'google'))
            ->assertRedirect(route('dashboard'));

        $this->assertAuthenticatedAs($existing);
    }

    public function test_callback_redirects_to_login_on_failure(): void
    {
        $driver = Mockery::mock();
        $driver->shouldReceive('user')->andThrow(new Exception('OAuth error'));

        Socialite::shouldReceive('driver')->with('google')->andReturn($driver);

        $this->get(route('auth.sso.callback', 'google'))
            ->assertRedirect(route('login'))
            ->assertSessionHas('error');
    }

    public function test_callback_redirects_to_login_when_no_email(): void
    {
        // Full mock needed: makePartial can't set email to null on SocialiteUser
        // because Mockery intercepts __set and getEmail() still reads the original property
        $socialiteUser = Mockery::mock(SocialiteUser::class);
        $socialiteUser->shouldReceive('getEmail')->andReturnNull();
        $socialiteUser->shouldReceive('getId')->andReturn('123456');
        $socialiteUser->email = null;
        $socialiteUser->user = [];

        $this->mockSocialiteDriver($socialiteUser);

        $this->get(route('auth.sso.callback', 'google'))
            ->assertRedirect(route('login'))
            ->assertSessionHas('error');
    }

    public function test_avatar_download_failure_does_not_prevent_user_creation(): void
    {
        $socialiteUser = $this->mockSocialiteUser([
            'avatar' => 'https://invalid-url.test/avatar.jpg',
        ]);
        $this->mockSocialiteDriver($socialiteUser);

        $this->get(route('auth.sso.callback', 'google'))
            ->assertRedirect(route('dashboard'));

        $this->assertDatabaseHas('users', ['email' => 'sso@example.com']);
        $this->assertAuthenticated();
    }
}
