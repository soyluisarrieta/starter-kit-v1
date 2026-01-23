<?php

namespace App\Enums;

enum Roles: string
{
    case SUPER_ADMIN = 'super-admin';
    case ADMIN = 'admin';

    public function label(): string
    {
        return match ($this) {
            static::SUPER_ADMIN => 'Super Administrador',
            static::ADMIN => 'Administrador',
        };
    }

    public function permissions(): array
    {
        return match ($this) {
            static::SUPER_ADMIN => [
                Permissions::LIST_USER->value,
                Permissions::VIEW_USER->value,
                Permissions::CREATE_USER->value,
                Permissions::UPDATE_USER->value,
                Permissions::DELETE_USER->value,
            ],
            static::ADMIN => [
                Permissions::LIST_USER->value,
                Permissions::VIEW_USER->value,
            ],
        };
    }
}
