<?php

namespace App\Http\Controllers\Settings;

use App\Http\Controllers\Controller;
use App\Http\Requests\CurrentPasswordRequest;
use App\Http\Requests\Settings\ProfileUpdateRequest;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Inertia\Response;

class ProfileController extends Controller
{
    /**
     * Show the user's profile settings page.
     */
    public function edit(Request $request): Response
    {
        return Inertia::render('settings/profile', [
            'mustVerifyEmail' => $request->user() instanceof MustVerifyEmail,
            'status' => $request->session()->get('status'),
        ]);
    }

    /**
     * Update the user's profile settings.
     */
    public function update(ProfileUpdateRequest $request): RedirectResponse
    {
        $request->user()->fill($request->validated());
        $profile = $request->user();

        // update email
        if ($profile->isDirty('email')) {
            $profile->email_verified_at = null;
        }

        // update avatar
        if ($profile->isDirty('avatar')) {
            $oldAvatar = $profile->getOriginal('avatar');

            if ($profile->avatar !== null) {
                $avatarName = Str::uuid().'.'.$profile->avatar->getClientOriginalExtension();
                $profile->avatar->storeAs('avatars', $avatarName, 'public');
                $profile->avatar = $avatarName;
            }

            if ($oldAvatar) {
                Storage::disk('public')->delete("avatars/{$oldAvatar}");
            }
        }
        $profile->save();

        return to_route('profile.edit');
    }

    /**
     * Delete the user's account.
     */
    public function destroy(CurrentPasswordRequest $request): RedirectResponse
    {
        $user = $request->user();

        Auth::logout();

        $user->delete();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return redirect('/');
    }
}
