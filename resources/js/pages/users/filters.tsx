import { defineFilters } from '@/components/data-table/data-table-utils'
import { User } from '@/types'
import { MinusCircleIcon, ShieldCheckIcon, User2Icon } from 'lucide-react'

export const userFiletarables = defineFilters<User>([
  {
    columnKey: 'roles',
    label: 'Roles',
    type: 'MULTI_SELECTION',
    options: [
      { label: 'Administradores', value: 'admin', icon: ShieldCheckIcon  },
      { label: 'Usuarios', value: 'user', icon: User2Icon },
      { label: 'Sin asignar', value: '', icon: MinusCircleIcon }
    ]
  }
])
