<?php

namespace App\Http\Controllers\Settings;

use App\Http\Controllers\Controller;
use App\Http\Requests\CurrentPasswordRequest;
use App\Http\Requests\Settings\RoleRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class RoleController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $roles = Role::where('name', '!=', 'super-admin')
            ->get()
            ->makeHidden(['permissions', 'guard_name'])
            ->map(fn ($role) => [
                ...$role->toArray(),
                'permissionIds' => $role->permissions->pluck('id'),
            ]);

        $permissions = Permission::select('id', 'name', 'label')->get();

        return Inertia::render('settings/roles', compact('roles', 'permissions'));
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(RoleRequest $request)
    {
        $data = $request->validated();

        $data['name'] = Str::slug($data['label']);

        Role::create($data);

        Inertia::flash('success', 'Nuevo rol ha sido creado');

        return back();
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(RoleRequest $request, Role $role)
    {
        if ($role->name === 'super-admin') {
            Inertia::flash('error', 'No se puede actualizar el rol de super administrador.');

            return back();
        }

        $data = $request->validated();

        $role->update($data);

        Inertia::flash('success', 'Rol actualizado correctamente');

        return back();
    }

    public function updatePermission(Request $request, Role $role)
    {
        if ($role->name === 'super-admin') {
            Inertia::flash('error', 'No se puede modificar permisos del super administrador.');

            return back();
        }

        $data = $request->validate([
            'permission' => 'required|string|exists:permissions,name',
            'enabled' => 'required|boolean',
        ]);

        $permissionName = $data['permission'];

        // Obtener el modelo Permission
        $permission = Permission::where('name', $permissionName)->firstOrFail();

        if ($request->boolean('enabled')) {
            $role->givePermissionTo($permission);
        } else {
            $role->revokePermissionTo($permission);
        }

        $negationPrefix = $request->boolean('enabled') ? '' : 'no';
        $message = "El {$role->label} ahora {$negationPrefix} puede \"{$permission->label}\"";

        Inertia::flash('success', $message);

        return back();
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Role $role, CurrentPasswordRequest $_)
    {
        if ($role->name === 'super-admin') {
            Inertia::flash('error', 'No se puede eliminar el rol de super administrador.');

            return back();
        }

        $totalRoles = Role::where('name', '!=', 'super-admin')->count();

        if ($totalRoles <= 1) {
            Inertia::flash('error', 'No se puede eliminar el último rol.');

            return back();
        }

        $role->delete();

        Inertia::flash('success', 'Rol eliminado correctamente');

        return back();
    }
}
