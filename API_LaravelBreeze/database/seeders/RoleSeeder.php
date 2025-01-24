<?php

namespace Database\Seeders;

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
    Role::create(['name' => 'admin'])
      ->givePermissionTo(['list:user', 'view:user', 'create:user', 'update:user', 'delete:user']);
    Role::create(['name' => 'user'])
      ->givePermissionTo(['list:user', 'create:user', 'update:user']);
  }
}
