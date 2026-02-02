<?php

namespace App\Http\Controllers;

use App\Http\Requests\CurrentPasswordRequest;
use App\Http\Requests\UserRequest;
use App\Models\User;
use Inertia\Inertia;

class UserController extends Controller
{
    public function index()
    {
        $users = User::with('roles')->get()->map(
            fn ($user) => [
                'id' => $user->id,
                'avatar' => $user->avatar,
                'name' => $user->name,
                'last_name' => $user->last_name,
                'email' => $user->email,
                'roles' => $user->roles->pluck('name')->toArray(),
                'created_at' => $user->created_at,
                'updated_at' => $user->updated_at,
            ]);

        return Inertia::render('users', compact('users'));
    }
    
    public function store(UserRequest $request)
    {
        $user = $request->validated();
        $user['password'] = bcrypt("qweqwe123");
        User::create($user);

        Inertia::flash('success', 'Usuario creado exitosamente');
        return to_route("users");
    }

    public function update(UserRequest $request, User $user)
    {
        $user->update($request->validated());

        Inertia::flash('success', 'Usuario actualizado exitosamente');
        return to_route("users");
    }

    public function destroy(User $user, CurrentPasswordRequest $_)
    {
        $user->delete();

        Inertia::flash('success', 'Usuario eliminado exitosamente');
        return to_route('users');
    }
}
