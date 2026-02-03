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
        Role::create([
            'name' => Roles::SUPER_ADMIN->value,
            'label' => Roles::SUPER_ADMIN->label(),
            'hex_color' => Roles::SUPER_ADMIN->hexColor(),
        ])
            ->givePermissionTo(Roles::SUPER_ADMIN->permissions());

        Role::create([
            'name' => Roles::ADMIN->value,
            'label' => Roles::ADMIN->label(),
            'hex_color' => Roles::ADMIN->hexColor(),
        ])
            ->givePermissionTo(Roles::ADMIN->permissions());
    }
}
