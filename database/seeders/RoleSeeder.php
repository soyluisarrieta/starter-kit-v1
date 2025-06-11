<?php

namespace Database\Seeders;

use App\Enums\Permissions;
use App\Enums\Roles;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;

class RoleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Role::create(['name' => Roles::ADMIN->value])
            ->givePermissionTo([
                Permissions::LIST_USER->value,
                Permissions::VIEW_USER->value,
                Permissions::CREATE_USER->value,
                Permissions::UPDATE_USER->value,
                Permissions::DELETE_USER->value,
            ]);

        Role::create(['name' => Roles::USER->value]);
    }
}
