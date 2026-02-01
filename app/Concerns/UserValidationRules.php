<?php

namespace App\Concerns;

use App\Models\User;
use Illuminate\Validation\Rule;

trait UserValidationRules
{
    /**
     * Get the validation rules used to validate user profiles.
     *
     * @return array<string, array<int, \Illuminate\Contracts\Validation\Rule|array<mixed>|string>>
     */
    protected function userRules(?int $userId = null): array
    {
        return [
            'name' => 'required|string|regex:/^[a-zA-Z\s]+$/|min:3|max:25',
            'last_name' => 'required|string|regex:/^[a-zA-Z\s]+$/|min:3|max:25',
            'avatar' => 'nullable|image|mimes:jpeg,png,jpg,webp|max:2048',
            'email' => $this->emailRules($userId),
        ];
    }

    /**
     * Get the validation rules used to validate user emails.
     *
     * @return array<int, \Illuminate\Contracts\Validation\Rule|array<mixed>|string>
     */
    protected function emailRules(?int $userId = null): array
    {
        return [
            'required',
            'string',
            'email:filter',
            'max:255',
            Rule::unique(User::class)->ignore($userId),
        ];
    }

    /**
     * Get the attributes used to validate users.
     *
     * @return array<string, string>
     */
    protected function userAttributes(): array
    {
        return [
            'name' => 'nombre',
            'last_name' => 'apellido',
            'avatar' => 'avatar',
            'email' => 'correo electrónico',
        ];
    }
}
