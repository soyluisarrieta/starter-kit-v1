<?php

namespace App\Http\Controllers\Settings;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
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
        $roles = Role::all()->makeHidden(['permissions', 'guard_name']);

        $permissions = Permission::select('id', 'name', 'label')->get();

        $data = $permissions->map(fn ($permission) => [
            'id' => $permission->id,
            'key' => $permission->name,
            'label' => $permission->label,
            'roles' => $roles->mapWithKeys(fn ($role) => [
                $role->name => $role->permissions->contains(
                    'name',
                    $permission->name
                ),
            ]),
        ]);

        return Inertia::render('settings/roles', compact('data', 'roles'));
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
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
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
