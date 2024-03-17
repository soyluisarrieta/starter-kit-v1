<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Laravel\Socialite\Facades\Socialite;

class SocialController extends Controller
{
    /**
     * Redirect the user to the provider's authentication page.
     *
     * @param  string  $provider
     * @return \Illuminate\Http\Response
     */
    public function redirect($provider)
    {
        return Socialite::driver($provider)->redirect();
    }

    /**
     * Obtain the user information from the provider.
     * 
     * Then you can create or update the user in your database and log them in.
     *
     * @param  string  $provider
     * @return \Illuminate\Http\Response
     */
    public function callback($provider)
    {
        $sso_auth = Socialite::driver($provider)->stateless()->user();

        $parts = explode(' ', $sso_auth->name);
        $name = array_shift($parts);
        $lastName = implode(' ', $parts);

        $user = User::updateOrCreate([
          'sso_id' => $sso_auth->id
        ],[
          'name' => $name,
          'last_name' => $lastName,
          'email' => $sso_auth->email,
          'sso_service' => $provider,
          'email_verified_at' => now(),
        ]);
        
        Auth::login($user);
        return redirect(env('FRONTEND_URL'));
    }
}
