<?php

namespace App\Enums;

enum Permissions: string
{
    case LIST_USERS = 'users.list';
    case VIEW_USERS = 'users.view';
    case CREATE_USERS = 'users.create';
    case UPDATE_USERS = 'users.update';
    case DELETE_USERS = 'users.delete';

    case READ_ROLES = 'roles.read';
    case CREATE_ROLES = 'roles.create';
    case UPDATE_ROLES = 'roles.update';
    case DELETE_ROLES = 'roles.delete';

    case VIEW_DASHBOARD = 'dashboard.view';

    public function label(): string
    {
        return match ($this) {
            self::LIST_USERS => 'Ver lista de usuarios',
            self::VIEW_USERS => 'Ver detalles de usuarios',
            self::CREATE_USERS => 'Crear nuevos usuarios',
            self::UPDATE_USERS => 'Editar detalles de usuario',
            self::DELETE_USERS => 'Eliminar usuarios',

            self::READ_ROLES => 'Ver lista de roles y permisos',
            self::CREATE_ROLES => 'Crear nuevos roles y asignar permisos',
            self::UPDATE_ROLES => 'Editar nombre de rol y permisos',
            self::DELETE_ROLES => 'Eliminar roles del sistema',

            self::VIEW_DASHBOARD => 'Acceder al panel de control',
        };
    }
}
