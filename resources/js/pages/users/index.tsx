import AppLayout from '@/layouts/app-layout'
import can from '@/lib/can'
import { User, type BreadcrumbItem } from '@/types'
import { Head, Link, router } from '@inertiajs/react'

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Usuarios',
    href: '/usuarios'
  }
]

export default function Users ({ users }: { users: User[] }) {
  const onDelete = (id: number) => {
    if (confirm('¿Estás seguro de que quieres eliminar este usuario?')) {
      router.delete(route('usuarios.eliminar', id))
    }
  }

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Usuarios" />

      <div className="overflow-x-auto p-4">
        {can('create:user') && (
          <Link
            href={route('usuarios.crear')}
            className="mb-4 inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Crear
          </Link>
        )}
        <table className="w-full text-sm text-left rtl:text-right text-neutral-500 dark:text-neutral-400">
          <thead className="text-xs text-neutral-700 uppercase bg-neutral-50 dark:bg-neutral-700 dark:text-neutral-400">
            <tr>
              <th scope="col" className="px-6 py-3">ID</th>
              <th scope="col" className="px-6 py-3">Nombre completo</th>
              <th scope="col" className="px-6 py-3">Correo electrónico</th>
              <th scope="col" className="px-6 py-3">Roles</th>
              <th scope="col" className="px-6 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map(({ id, name, email, roles }) => (
              <tr
                key={id}
                className="odd:bg-white odd:dark:bg-neutral-900 even:bg-neutral-50 even:dark:bg-neutral-800 border-b dark:border-neutral-700 border-neutral-200"
              >
                <td className="px-6 py-2 font-medium text-neutral-900 dark:text-white">{id}</td>
                <td className="px-6 py-2 text-neutral-600 dark:text-neutral-300">{name}</td>
                <td className="px-6 py-2 text-neutral-600 dark:text-neutral-300">{email}</td>
                <td className="px-6 py-2 text-neutral-600 dark:text-neutral-300">{roles.join(', ')}</td>
                <td className="px-6 py-2">
                  <Link
                    className="cursor-pointer mr-1 px-3 py-2 text-xs font-medium text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    href={route('usuarios.mostrar', { id })}
                  >
                    Ver
                  </Link>
                  <Link
                    className="cursor-pointer px-3 py-2 text-xs font-medium text-white bg-amber-700 rounded-lg hover:bg-amber-800 focus:ring-4 focus:outline-none focus:ring-amber-300 dark:bg-amber-600 dark:hover:bg-amber-700 dark:focus:ring-amber-800"
                    href={route('usuarios.editar', { id })}
                  >
                    Editar
                  </Link>
                  <button
                    className="cursor-pointer px-3 py-2 text-xs font-medium text-white bg-red-700 rounded-lg hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800 ml-1"
                    onClick={() => onDelete(id)}
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AppLayout>
  )
}
