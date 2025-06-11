<?php

namespace Database\Seeders;

use App\Enums\Permissions;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;

class PermissionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $permissions = [
            Permissions::LIST_USER->value,
            Permissions::VIEW_USER->value,
            Permissions::CREATE_USER->value,
            Permissions::UPDATE_USER->value,
            Permissions::DELETE_USER->value,
        ];

        foreach ($permissions as $permission) {
            Permission::firstOrCreate(['name' => $permission]);
        }
    }
}
