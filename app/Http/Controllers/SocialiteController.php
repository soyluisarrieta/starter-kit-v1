<?php

namespace App\Http\Controllers;

use App\Models\User;
use Exception;
use GuzzleHttp\Client;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
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
            $ssoUser->getName()
            ?? $ssoUser->name
            ?? ($ssoUser->user['name'] ?? null)
            ?? explode('@', $email)[0]
            ?? 'Usuario';

        // find or create user
        $user = User::query()
            ->where('sso_id', $ssoUser->getId())
            ->where('sso_provider', $provider)
            ->first();

        if (!$user) {
            $user = User::query()->where('email', $email)->first();

            if ($user) {
                $user->fill([
                    'sso_id' => $ssoUser->getId(),
                    'sso_provider' => $provider,
                ]);
            } else {
                $user = new User([
                    'sso_id' => $ssoUser->getId(),
                    'sso_provider' => $provider,
                    'name' => $name,
                    'email' => $email,
                    'password' => Hash::make(Str::random(24)),
                    'email_verified_at' => now(),
                ]);
            }

            // download avatar if present
            $avatarUrl = $ssoUser->getAvatar() ?? $ssoUser->avatar ?? null;

            if ($avatarUrl) {
                try {
                    $client = new Client;
                    $image = $client->get($avatarUrl)->getBody()->getContents();
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

            $user->save();
        }

        // auto-login user
        Auth::login($user, true);
        return redirect()->route('dashboard');
    }
}
