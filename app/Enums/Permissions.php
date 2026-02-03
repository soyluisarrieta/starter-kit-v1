<?php

namespace App\Enums;

enum Permissions: string
{
    case LIST_USERS = 'list:users';
    case VIEW_USERS = 'view:users';
    case CREATE_USERS = 'create:users';
    case UPDATE_USERS = 'update:users';
    case DELETE_USERS = 'delete:users';

    case READ_ROLES = 'read:roles';
    case CREATE_ROLES = 'create:roles';
    case UPDATE_ROLES = 'update:roles';
    case DELETE_ROLES = 'delete:roles';

    case VIEW_DASHBOARD = 'view:dashboard';

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

    public static function getGroupedPermissions()
    {
        $groups = [
            'user-management' => [
                self::LIST_USERS,
                self::VIEW_USERS,
                self::CREATE_USERS,
                self::UPDATE_USERS,
                self::DELETE_USERS,
            ],
            'role-management' => [
                self::READ_ROLES,
                self::CREATE_ROLES,
                self::UPDATE_ROLES,
                self::DELETE_ROLES,
            ],
            'others' => [
                self::VIEW_DASHBOARD,
            ],
        ];

        foreach ($groups as $key => $permissions) {
            $groups[$key] = array_map(fn (self $permission) => [
                'label' => $permission->label(),
                'value' => $permission->value,
            ], $permissions);
        }

        return $groups;
    }
}
