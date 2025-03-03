<?php

namespace Database\Seeders;

use App\Enums\Roles;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // User::factory()->count(5)->create();
        User::create([
            'name' => 'Luis',
            'lastname' => 'Arrieta',
            'email' => 'luisarrieta796@gmail.com',
            'password' => bcrypt('Pa$$w0rd'),
        ])->assignRole(Roles::ADMIN->value);
    }
}
