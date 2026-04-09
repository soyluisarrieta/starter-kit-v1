<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class EnsurePasswordIsSet
{
    /**
     * Redirect SSO-only users to the password setup screen until they choose a password.
     */
    public function handle(Request $request, Closure $next): Response
    {
        $user = $request->user();

        if ($user && $user->password_set_at === null && ! $request->routeIs('password.setup', 'password.setup.store', 'logout')) {
            return redirect()->route('password.setup');
        }

        return $next($request);
    }
}
