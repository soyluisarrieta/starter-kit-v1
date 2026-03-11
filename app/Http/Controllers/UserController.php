<?php

namespace App\Http\Controllers;

use App\Concerns\HasDataTable;
use App\Http\Requests\CurrentPasswordRequest;
use App\Http\Requests\DataTableRequest;
use App\Http\Requests\User\DestroyMultipleUsersRequest;
use App\Http\Requests\User\UserRequest;
use App\Models\User;
use Inertia\Inertia;
use Spatie\Permission\Models\Role;

class UserController extends Controller
{
    use HasDataTable;

    public function index(DataTableRequest $request)
    {
        $query = User::with('roles');
        $sortableColumns = ['id', 'name', 'last_name', 'email', 'created_at', 'updated_at'];
        $users = $this
            ->applyDataTable($query, $request, $sortableColumns)
            ->through(fn (User $user) => [
                ...$user->makeHidden('roles')->toArray(),
                'roleIds' => $user->roles->pluck('id')->toArray(),
            ]);

        if ($request->wantsJson()) {
            return response()->json($users);
        }

        $queryParams = $request->validated();
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
