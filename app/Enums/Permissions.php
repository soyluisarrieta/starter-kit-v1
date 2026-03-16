<?php

namespace App\Enums;

enum Permissions: string
{
    case LIST_USERS = 'users.list';
    case VIEW_USERS = 'users.view';
    case CREATE_USERS = 'users.create';
    case UPDATE_USERS = 'users.update';
    case DELETE_USERS = 'users.delete';

    case MANAGE_ROLES = 'roles.manage';

    case VIEW_DASHBOARD = 'dashboard.view';

    case MANAGE_ERRORS = 'errors.manage';

    public function label(): string
    {
        return match ($this) {
            self::LIST_USERS => 'Ver lista de usuarios',
            self::VIEW_USERS => 'Ver detalles de usuarios',
            self::CREATE_USERS => 'Crear nuevos usuarios',
            self::UPDATE_USERS => 'Editar detalles de usuario',
            self::DELETE_USERS => 'Eliminar usuarios',

            self::MANAGE_ROLES => 'Gestionar roles y permisos',

            self::VIEW_DASHBOARD => 'Acceder al panel de control',

            self::MANAGE_ERRORS => 'Gestionar errores de cliente',
        };
    }
}
