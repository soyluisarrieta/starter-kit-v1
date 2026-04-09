<?php

namespace App\Http\Controllers;

use App\Models\User;
use Exception;
use GuzzleHttp\Client;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Laravel\Socialite\Facades\Socialite;

class SocialiteController extends Controller
{
    /**
     * Redirect to SSO provider
     */
    public function redirectToProvider(string $provider): RedirectResponse
    {
        return Socialite::driver($provider)->redirect();
    }

    /**
     * Handle SSO callback
     */
    public function handleProviderCallback(string $provider): RedirectResponse
    {
        try {
            $ssoUser = Socialite::driver($provider)->user();
        } catch (Exception $e) {
            Log::error("Socialite login error ({$provider}): {$e->getMessage()}");

            return redirect()
                ->route('login')
                ->with('error', 'No se pudo iniciar sesión con '.ucfirst($provider));
        }

        // get relevant data from sso user
        $email = $ssoUser->getEmail() ?? $ssoUser->email ?? null;

        if (! $email) {
            Log::error("Socialite login error: {$provider} did not provide email");

            return redirect()
                ->route('login')
                ->with('error', 'No se pudo obtener el correo electrónico');
        }

        $name =
            ($ssoUser->user['given_name'] ?? null)
            ?? explode('@', $email)[0]
            ?? 'Usuario';

        $lastName = $ssoUser->user['family_name'] ?? $name;

        // find user by sso credentials
        $user = User::query()
            ->where('sso_id', $ssoUser->getId())
            ->where('sso_provider', $provider)
            ->first();

        if (! $user) {
            // block sso when an account already exists for this email without sso linked
            if (User::query()->where('email', $email)->exists()) {
                return redirect()
                    ->route('login')
                    ->with('error', 'Ya existe una cuenta con este correo. Inicia sesión y vincula '.ucfirst($provider).' desde tu perfil.');
            }

            $user = new User([
                'sso_id' => $ssoUser->getId(),
                'sso_provider' => $provider,
                'name' => $name,
                'last_name' => $lastName,
                'email' => $email,
                'password' => Str::random(24),
                'password_set_at' => null,
                'email_verified_at' => now(),
            ]);

            $avatarUrl = $ssoUser->getAvatar() ?? $ssoUser->avatar ?? null;
            $this->downloadAvatar($user, $avatarUrl, $provider);

            $user->save();
        }

        // auto-login user
        Auth::login($user, true);

        // force password setup for sso-only accounts
        if ($user->password_set_at === null) {
            return redirect()->route('password.setup');
        }

        return redirect()->route('dashboard');
    }

    /**
     * Download and store user avatar from SSO provider
     */
    private function downloadAvatar(User $user, ?string $url, string $provider): void
    {
        if (! $url || ! str_starts_with($url, 'https://')) {
            return;
        }

        try {
            $response = (new Client([
                'timeout' => 5,
                'connect_timeout' => 3,
            ]))->get($url);

            $contentType = $response->getHeaderLine('Content-Type');
            if (! str_starts_with($contentType, 'image/')) {
                throw new Exception("Invalid Content-Type: {$contentType}");
            }

            $contentLength = $response->getHeaderLine('Content-Length');
            if ($contentLength && (int) $contentLength > 2 * 1024 * 1024) {
                throw new Exception('Avatar too large (Content-Length)');
            }

            $image = $response->getBody()->getContents();
            if (strlen($image) > 2 * 1024 * 1024) {
                throw new Exception('Avatar too large (body)');
            }

            $avatarName = Str::uuid().'.jpg';
            Storage::disk('public')->put("avatars/{$avatarName}", $image);

            if ($user->avatar) {
                Storage::disk('public')->delete("avatars/{$user->avatar}");
            }

            $user->avatar = $avatarName;
        } catch (Exception $e) {
            Log::error("Avatar download error ({$provider}): {$e->getMessage()}");
        }
    }
}
