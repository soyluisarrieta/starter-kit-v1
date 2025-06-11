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
        User::create([
            'name' => 'Luis Arrieta',
            'email' => 'luisarrieta796@gmail.com',
            'password' => bcrypt('qweqwe123'),
        ])->assignRole(Roles::ADMIN->value);

        User::create([
            'name' => 'Jessica Pistala',
            'email' => 'jpaola1017@gmail.com',
            'password' => bcrypt('qweqwe123'),
        ])->assignRole(Roles::USER->value);
    }
}
