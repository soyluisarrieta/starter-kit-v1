<?php

namespace App\Enums;

enum Roles: string
{
    case SUPER_ADMIN = 'super-admin';
    case ADMIN = 'admin';

    public function label(): string
    {
        return match ($this) {
            self::SUPER_ADMIN => 'Super Admin',
            self::ADMIN => 'Administrador',
        };
    }

    public function hexColor(): string
    {
        return match ($this) {
            self::SUPER_ADMIN => '#AD46FF',
            self::ADMIN => '#2B7FFF',
        };
    }

    public function permissions(): array
    {
        return match ($this) {
            self::SUPER_ADMIN => array_column(Permissions::cases(), 'value'),
            self::ADMIN => [
                Permissions::VIEW_DASHBOARD->value,
            ],
        };
    }
}
