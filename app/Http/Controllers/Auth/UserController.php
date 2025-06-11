<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render("users/index", [
            "users" => User::with('roles')->get()->map(
                fn($user) => [
                    'id' => $user->id,
                    'name' => $user->name,
                    'email' => $user->email,
                    'roles' => $user->roles->pluck('name')->toArray()
                ]
            ),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render("users/create");
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            "name" => "required|string|max:100",
            "email" => "required|email|unique:users",
        ]);

        User::create([
            "name" => $request->name,
            "email" => $request->email,
            "password" => bcrypt("qweqwe123"),
        ]);

        return to_route("usuarios.index");
    }
    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        return Inertia::render("users/show", [
            "user" => User::findOrFail($id),
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        $user = User::findOrFail($id);
        return Inertia::render("users/edit", [
            "user" => $user,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $user = User::findOrFail($id);

        $validationRules = [
            'name' => 'required|string|max:100',
            'email' => "required|email|unique:users,email,{$user->id}",
        ];

        $request->validate($validationRules);

        $user->update($request->only(['name', 'email']));

        return to_route('usuarios.index');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        User::destroy($id);
        return to_route("usuarios.index");
    }
}
