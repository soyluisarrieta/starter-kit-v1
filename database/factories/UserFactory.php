<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\User>
 */
class UserFactory extends Factory
{
    /**
     * The current password being used by the factory.
     */
    protected static ?string $password;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => fake()->firstName(),
            'lastname' => fake()->lastName(),
            'gender' => fake()->randomElement(['male', 'female', 'other']),
            'birthdate' => fake()->date(),
            'address' => fake()->address(),
            'phone' => (string) random_int(3000000000, 3300000000),
            'has_whatsapp' => fake()->boolean(),
            'email' => fake()->unique()->safeEmail(),
            'email_verified_at' => now(),
            'password' => static::$password ??= Hash::make('Pa$$w0rd'),
            'avatar' => fake()->randomElement(['avatar.jpeg', 'avatar.jpg', 'avatar.png', 'avatar.webp']),
            'status' => 'active',
            'sso_id' => null,
            'sso_provider' => null,
            'remember_token' => Str::random(10),
        ];
    }

    /**
     * Indicate that the model's email address should be unverified.
     */
    public function unverified(): static
    {
        return $this->state(fn(array $attributes) => [
            'email_verified_at' => null,
        ]);
    }
}
