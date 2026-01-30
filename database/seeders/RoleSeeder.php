<?php

namespace Database\Seeders;

use App\Enums\Roles;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;

class RoleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Role::create(['name' => Roles::SUPER_ADMIN->value])
            ->givePermissionTo(Roles::SUPER_ADMIN->permissions());

        Role::create(['name' => Roles::ADMIN->value])
            ->givePermissionTo(Roles::ADMIN->permissions());
    }
}
