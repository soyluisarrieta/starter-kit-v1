<?php

namespace App\Http\Controllers\Settings;

use App\Http\Controllers\Controller;
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
        $roles = Role::all()
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
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Role $role)
    {
        $data = $request->validate([
            'label' => 'required|string|max:70|unique:roles,label,'.$role->id,
            'hex_color' => ['required', 'string', 'max:7', 'regex:/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/'],
        ]);

        $role->update([
            'label' => $data['label'],
            'hex_color' => $data['hex_color'],
        ]);

        Inertia::flash('success', 'Rol actualizado correctamente');

        return back();
    }

    public function updatePermission(Request $request, Role $role)
    {
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
    public function destroy(string $id)
    {
        //
    }
}
