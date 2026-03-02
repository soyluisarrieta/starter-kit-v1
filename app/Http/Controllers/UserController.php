<?php

namespace App\Http\Controllers;

use App\Http\Requests\CurrentPasswordRequest;
use App\Http\Requests\User\DestroyMultipleUsersRequest;
use App\Http\Requests\User\UserRequest;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Spatie\Permission\Models\Role;

class UserController extends Controller
{
    public function index(Request $request)
    {
        $queryParams = $request->only(['search', 'perPage', 'sortBy', 'sortOrder']);

        $search = $queryParams['search'] ?? '';
        $perPage = $queryParams['perPage'] ?? 10;
        $sortBy = $queryParams['sortBy'] ?? 'id';
        $sortOrder = $queryParams['sortOrder'] ?? 'desc';

        $users = User::with('roles')
            ->search($search)
            ->orderBy($sortBy, $sortOrder)
            ->paginate($perPage)
            ->withQueryString()
            ->through(fn(User $user) => [
                ...$user->makeHidden('roles')->toArray(),
                'roleIds' => $user->roles->pluck('id')->toArray(),
            ]);

        $roles = Role::select('id', 'name', 'label', 'hex_color')->get();

        return Inertia::render('users', compact('users', 'roles', 'queryParams'));
    }

    public function store(UserRequest $request)
    {
        $user = $request->validated();
        $user['password'] = bcrypt('qweqwe123');
        User::create($user);
        Inertia::flash('success', 'Usuario creado exitosamente');

        return to_route('users');
    }

    public function update(UserRequest $request, User $user)
    {
        $user->update($request->validated());
        Inertia::flash('success', 'Usuario actualizado exitosamente');

        return to_route('users');
    }

    public function destroy(User $user, CurrentPasswordRequest $_)
    {
        $user->delete();
        Inertia::flash('success', 'Usuario eliminado exitosamente');

        return to_route('users');
    }

    public function destroyMultiple(DestroyMultipleUsersRequest $request)
    {
        $userIds = $request->validated('ids');
        User::whereIn('id', $userIds)->delete();
        Inertia::flash('success', 'Usuarios eliminados exitosamente');

        return to_route('users');
    }
}
