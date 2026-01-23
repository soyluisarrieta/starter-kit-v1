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
            static::LIST_USER => 'Listar Usuarios',
            static::VIEW_USER => 'Ver Usuario',
            static::CREATE_USER => 'Crear Usuario',
            static::UPDATE_USER => 'Actualizar Usuario',
            static::DELETE_USER => 'Eliminar Usuario',
        };
    }
}
