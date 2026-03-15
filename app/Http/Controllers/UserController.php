<?php

namespace App\Http\Controllers;

use App\Concerns\HasDataTable;
use App\Http\Requests\CurrentPasswordRequest;
use App\Http\Requests\DataTableRequest;
use App\Http\Requests\User\DestroyMultipleUsersRequest;
use App\Http\Requests\User\UserRequest;
use App\Models\User;
use Illuminate\Support\Str;
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

        $queryParams = [
            ...$request->validated(),
            'page' => $request->integer('page', 1) ?: 1,
        ];
        $roles = Role::select('id', 'name', 'label', 'hex_color')->get();

        return Inertia::render('users', compact('users', 'roles', 'queryParams'));
    }

    public function store(UserRequest $request)
    {
        $user = $request->validated();
        $user['password'] = Str::password(16);
        User::create($user);
        Inertia::flash('success', 'Usuario creado exitosamente');

        return back();
    }

    public function update(UserRequest $request, User $user)
    {
        $user->update($request->validated());
        Inertia::flash('success', 'Usuario actualizado exitosamente');

        return back();
    }

    public function destroy(User $user, CurrentPasswordRequest $_)
    {
        $user->delete();
        Inertia::flash('success', 'Usuario eliminado exitosamente');

        return back();
    }

    public function destroyMultiple(DestroyMultipleUsersRequest $request)
    {
        $userIds = $request->validated('ids');
        User::whereIn('id', $userIds)->delete();
        Inertia::flash('success', 'Usuarios eliminados exitosamente');

        return back();
    }
}
