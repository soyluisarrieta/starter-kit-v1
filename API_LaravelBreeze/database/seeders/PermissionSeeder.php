<?php

namespace Database\Seeders;

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
    Permission::create(['name' => 'list:user']);
    Permission::create(['name' => 'view:user']);
    Permission::create(['name' => 'create:user']);
    Permission::create(['name' => 'update:user']);
    Permission::create(['name' => 'delete:user']);
  }
}
