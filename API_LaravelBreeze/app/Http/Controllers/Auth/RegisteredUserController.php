<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;

class RegisteredUserController extends Controller
{
    /**
     * Handle an incoming registration request.
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function store(Request $request): Response
    {
        $request->validate([
            'name' => ['required', 'string', 'alpha', 'max:25'],
            'last_name' => ['required', 'string', 'alpha', 'max:25'],
            'birthdate' => ['nullable', 'date'],
            'gender' => ['nullable', 'in:male,female,other'],
            'phone' => ['nullable', 'numeric', 'max:10'],
            'address' => ['nullable', 'string', 'max:255'],
            'avatar' => ['nullable', 'string', 'max:50'],
            'email' => ['required', 'string', 'lowercase', 'email', 'max:255', 'unique:'.User::class],
            'password' => ['required', 'confirmed', Password::min(8)->letters()->numbers()],
        ]);

        $user = User::create([
          'name' => $request->name,
          'last_name' => $request->last_name,
          'birthdate' => $request->birthdate,
          'gender' => $request->gender,
          'phone' => $request->phone,
          'address' => $request->address,
          'avatar' => $request->avatar,
          'email' => $request->email,
          'password' => Hash::make($request->password),
          'active' => true,
        ]);

        event(new Registered($user));

        Auth::login($user);

        return response()->noContent();
    }
}
