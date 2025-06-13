import { defineColumns } from '@/components/data-table/data-table-utils'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { User } from '@/types'
import { Link, router } from '@inertiajs/react'
import { CopyIcon, EditIcon, ListIcon, MoreHorizontalIcon, ShieldCheckIcon, TrashIcon, User2Icon } from 'lucide-react'

export const userColumns = defineColumns<User>([
  {
    accessorKey: 'id',
    header: 'ID'
  },
  {
    accessorKey: 'name',
    header: 'Nombre',
    cell: ({ row: { original } }) => (
      <Link href={route('usuarios.mostrar', { id: original.id })}>
        {original.name}
      </Link>
    )
  },
  {
    accessorKey: 'lastname',
    header: 'Apellido',
    minWidth: 150,
    cell: ({ row: { original } }) => (
      <Link href={route('usuarios.mostrar', { id: original.id })}>
        {original.lastname}
      </Link>
    )
  },
  {
    accessorKey: 'email',
    header: 'Correo electrónico',
    width: '100%'
  },
  {
    accessorKey: 'roles',
    header: 'Roles',
    align: 'center',
    cell: ({ row: { original } }) => {
      return (
        <Badge
          className='px-1'
          variant={original.roles.length ? 'default' : 'outline'}
        >
          {original.roles.includes('admin') && <ShieldCheckIcon />}
          {original.roles.includes('user') && <User2Icon />}
          {original.roles.join(', ') || 'Sin rol'}
        </Badge>
      )
    }
  },
  {
    id: 'actions',
    width: 'auto',
    enableHiding: false,
    cell: ({ row }) => {
      const user = row.original

      const onDelete = (id: User['id']) => {
        if (confirm('¿Estás seguro de que quieres eliminar este usuario?')) {
          router.delete(route('usuarios.eliminar', id))
        }
      }

      return (
        <DropdownMenu>
          <Button variant="ghost" className="size-8 p-0" asChild>
            <DropdownMenuTrigger>
              <span className="sr-only">Abrir menú</span>
              <MoreHorizontalIcon className="h-4 w-4" />
            </DropdownMenuTrigger>
          </Button>
          <DropdownMenuContent align="end">
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(user.id)}
            >
              <CopyIcon />
              Copiar ID de usuario
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link href={route('usuarios.mostrar', { id: user.id })}>
                <ListIcon />
                Ver detalles
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href={route('usuarios.editar', { id: user.id })}>
                <EditIcon />
                Editar
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => onDelete(user.id)}
              asChild
            >
              <span className='hover:bg-destructive/40!'>
                <TrashIcon />
                Eliminar
              </span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    }
  }
])
