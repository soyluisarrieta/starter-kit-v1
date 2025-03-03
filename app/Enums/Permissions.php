<?php

namespace App\Enums;

enum Permissions: string
{
  // USER PERMISSIONS
  case LIST_USER = 'list:user';
  case VIEW_USER = 'view:user';
  case CREATE_USER = 'create:user';
  case UPDATE_USER = 'update:user';
  case DELETE_USER = 'delete:user';
}