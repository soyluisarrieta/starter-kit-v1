<?php

namespace App\Enums;

enum Roles: string
{
    case SUPER_ADMIN = 'super-admin';
    case ADMIN = 'admin';

    public function label(): string
    {
        return match ($this) {
            self::SUPER_ADMIN => 'Super Administrador',
            self::ADMIN => 'Administrador',
        };
    }

    public function permissions(): array
    {
        return match ($this) {
            self::SUPER_ADMIN => [
                Permissions::LIST_USERS->value,
                Permissions::VIEW_USERS->value,
                Permissions::CREATE_USERS->value,
                Permissions::UPDATE_USERS->value,
                Permissions::DELETE_USERS->value,
            ],
            self::ADMIN => [
                Permissions::LIST_USERS->value,
                Permissions::VIEW_USERS->value,
            ],
        };
    }
}
