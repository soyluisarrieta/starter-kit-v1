<?php

namespace App\Http\Controllers\Auth;

use App\Concerns\PasswordValidationRules;
use App\Http\Controllers\Controller;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class SetupPasswordController extends Controller
{
    use PasswordValidationRules;

    /**
     * Show the password setup form for users who registered via SSO.
     */
    public function show(Request $request): RedirectResponse|Response
    {
        if ($request->user()->password_set_at !== null) {
            return redirect()->route('dashboard');
        }

        return Inertia::render('auth/setup-password');
    }

    /**
     * Store the new password and unlock the account.
     */
    public function store(Request $request): RedirectResponse
    {
        $user = $request->user();

        if ($user->password_set_at !== null) {
            return redirect()->route('dashboard');
        }

        $request->validate([
            'password' => $this->passwordRules(),
        ], [], $this->passwordAttributes());

        $user->forceFill([
            'password' => $request->input('password'),
            'password_set_at' => now(),
        ])->save();

        return redirect()->route('dashboard');
    }
}
