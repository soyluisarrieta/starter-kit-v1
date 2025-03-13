<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Mail\LoginAlertMail;
use App\Models\User;
use Exception;
use GuzzleHttp\Client;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Laravel\Socialite\Facades\Socialite;

class SocialiteController extends Controller
{
    /**
     * Redirect the user to the provider's authentication page.
     *
     * @param string $provider
     * @return \Illuminate\Http\RedirectResponse
     */
    public function redirectToProvider($provider)
    {
        return Socialite::driver($provider)->redirect();
    }

    /**
     * Handle the callback from the provider.
     *
     * @param string $provider
     * @return \Illuminate\Http\RedirectResponse
     */
    public function handleProviderCallback($provider)
    {
        try {
            $user_sso = Socialite::driver($provider)->user();
        } catch (Exception $e) {
            Log::error('Socialite login error: ' . $e->getMessage());
            return response()->json(['error' => 'Unable to login'], 400);
        }

        $name = $user_sso->user['given_name'];
        $lastname = $user_sso->user['family_name'];

        // Check if the user already exists by SSO ID and provider
        $user = User::where('sso_id', $user_sso->id)
            ->where('sso_provider', $provider)
            ->first();

        if (!$user) {
            $user = User::where('email', $user_sso->email)->first();

            if ($user) {
                $user->sso_id = $user_sso->id;
                $user->sso_provider = $provider;
            } else {
                $user = new User([
                    'sso_id' => $user_sso->id,
                    'sso_provider' => $provider,
                    'name' => $name,
                    'lastname' => $lastname,
                    'email' => $user_sso->email,
                    'password' => Hash::make(Str::random(12)),
                    'email_verified_at' => now(),
                ]);
            }

            // Download and save the avatar image
            if ($user_sso->avatar) {
                try {
                    $client = new Client();
                    $response = $client->request('GET', $user_sso->avatar);
                    $imageContent = $response->getBody()->getContents();
                    $avatarName = Str::uuid() . '.jpg';

                    Storage::disk('public')->put("avatars/{$avatarName}", $imageContent);

                    $user->avatar = $avatarName;

                    if ($user->isDirty('avatar') && $user->getOriginal('avatar')) {
                        Storage::disk('public')->delete("avatars/{$user->getOriginal('avatar')}");
                    }
                } catch (Exception $e) {
                    Log::error('Avatar download error: ' . $e->getMessage());
                }
            }

            $user->save();
        }

        Auth::login($user, true);

        if (!config('app.debug')) {
            Mail::to($user->email)->send(new LoginAlertMail());
        }

        return to_route('dashboard');
    }
}
