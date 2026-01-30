<?php

namespace App\Enums;

enum Permissions: string
{
    case LIST_USER = 'list:user';
    case VIEW_USER = 'view:user';
    case CREATE_USER = 'create:user';
    case UPDATE_USER = 'update:user';
    case DELETE_USER = 'delete:user';

    public function label(): string
    {
        return match ($this) {
            self::LIST_USER => 'Listar Usuarios',
            self::VIEW_USER => 'Ver Usuario',
            self::CREATE_USER => 'Crear Usuario',
            self::UPDATE_USER => 'Actualizar Usuario',
            self::DELETE_USER => 'Eliminar Usuario',
        };
    }
}
