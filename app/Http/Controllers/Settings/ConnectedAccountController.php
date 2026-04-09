<?php

namespace App\Http\Controllers\Settings;

use App\Http\Controllers\Controller;
use App\Models\User;
use Exception;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;
use Inertia\Response;
use Laravel\Socialite\Facades\Socialite;

class ConnectedAccountController extends Controller
{
    /**
     * Show the connected accounts management page.
     */
    public function edit(Request $request): Response
    {
        $user = $request->user();

        return Inertia::render('settings/connected-accounts', [
            'connectedProvider' => $user->sso_provider,
            'canDisconnect' => $user->password_set_at !== null,
        ]);
    }

    /**
     * Redirect to the SSO provider to start the linking flow.
     */
    public function link(Request $request, string $provider): RedirectResponse
    {
        $request->session()->put('socialite_intent', 'link');

        return Socialite::driver($provider)->redirect();
    }

    /**
     * Handle the SSO callback for the linking flow.
     */
    public function linkCallback(Request $request, string $provider): RedirectResponse
    {
        $intent = $request->session()->pull('socialite_intent');

        if ($intent !== 'link') {
            return redirect()->route('connected-accounts.edit')
                ->with('error', 'Solicitud de vinculación inválida.');
        }

        try {
            $ssoUser = Socialite::driver($provider)->user();
        } catch (Exception $e) {
            Log::error("Socialite link error ({$provider}): {$e->getMessage()}");

            return redirect()->route('connected-accounts.edit')
                ->with('error', 'No se pudo vincular '.ucfirst($provider).'.');
        }

        $user = $request->user();

        // prevent linking if another account already uses this sso identity
        $taken = User::query()
            ->where('sso_id', $ssoUser->getId())
            ->where('sso_provider', $provider)
            ->where('id', '!=', $user->id)
            ->exists();

        if ($taken) {
            return redirect()->route('connected-accounts.edit')
                ->with('error', 'Esta cuenta de '.ucfirst($provider).' ya está vinculada a otro usuario.');
        }

        $user->forceFill([
            'sso_id' => $ssoUser->getId(),
            'sso_provider' => $provider,
        ])->save();

        return redirect()->route('connected-accounts.edit')
            ->with('success', ucfirst($provider).' vinculado correctamente.');
    }

    /**
     * Unlink the SSO provider from the current user.
     */
    public function destroy(Request $request): RedirectResponse
    {
        $user = $request->user();

        if ($user->password_set_at === null) {
            return redirect()->route('connected-accounts.edit')
                ->with('error', 'Configura una contraseña antes de desvincular tu cuenta SSO.');
        }

        $user->forceFill([
            'sso_id' => null,
            'sso_provider' => null,
        ])->save();

        return redirect()->route('connected-accounts.edit')
            ->with('success', 'Cuenta desvinculada correctamente.');
    }
}
