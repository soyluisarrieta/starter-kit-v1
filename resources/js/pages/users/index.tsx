import { DataTable } from '@/components/data-table/data-table'
import AppLayout from '@/layouts/app-layout'
import can from '@/lib/can'
import { userColumns } from '@/pages/users/columns'
import { userFiletarables } from '@/pages/users/filters'
import { User, type BreadcrumbItem } from '@/types'
import { Head, Link } from '@inertiajs/react'

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Usuarios',
    href: '/usuarios'
  }
]

const userTabs = {
  defaultTab: 'all',
  tabs: [
    {
      value: 'all',
      label: 'Todo',
      columnVisibility: { lastname: false }
    },
    {
      value: 'admins',
      label: 'Administradores',
      columnVisibility: { lastname: false },
      filter: (user: User) => user.roles.includes('admin')
    },
    {
      value: 'users',
      label: 'Usuarios',
      columnVisibility: { lastname: false },
      filter: (user: User) => user.roles.includes('user')
    }
  ]
}

export default function Users ({ users }: { users: User[] }) {
  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Usuarios" />

      <div className="max-w-6xl w-full mx-auto overflow-x-auto p-4">
        {can('create:user') && (
          <Link
            href={route('usuarios.crear')}
            className="mb-4 inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Crear
          </Link>
        )}
        <DataTable
          columns={userColumns}
          data={users}
          filterableColumns={userFiletarables}
          tabs={userTabs}
        />
      </div>
    </AppLayout>
  )
}
