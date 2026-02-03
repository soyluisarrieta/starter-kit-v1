<?php

namespace App\Enums;

enum Permissions: string
{
    case LIST_USERS = 'list:users';
    case VIEW_USERS = 'view:users';
    case CREATE_USERS = 'create:users';
    case UPDATE_USERS = 'update:users';
    case DELETE_USERS = 'delete:users';

    public function label(): string
    {
        return match ($this) {
            self::LIST_USERS => 'Listar Usuarios',
            self::VIEW_USERS => 'Ver Usuarios',
            self::CREATE_USERS => 'Crear Usuarios',
            self::UPDATE_USERS => 'Actualizar Usuarios',
            self::DELETE_USERS => 'Eliminar Usuarios',
        };
    }
}
