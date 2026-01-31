<?php

namespace Database\Seeders;

use App\Enums\Roles;
use App\Models\User;
use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        User::firstOrCreate([
            'name' => 'Luis',
            'last_name' => 'Arrieta',
            'email' => 'luisarrieta796@gmail.com',
            'password' => bcrypt('qweqwe123'),
        ])->assignRole(Roles::SUPER_ADMIN->value);

        User::firstOrCreate([
            'name' => 'Paola',
            'last_name' => 'Pistala',
            'email' => 'jpaola1017@gmail.com',
            'password' => bcrypt('qweqwe123'),
        ])->assignRole(Roles::ADMIN->value);
    }
}
