import InputError from '@/components/input-error'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import AppLayout from '@/layouts/app-layout'
import { User, type BreadcrumbItem } from '@/types'
import { Head, Link, useForm } from '@inertiajs/react'

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Mostrar usuario',
    href: '/usuarios'
  }
]

export default function ShowUsers ({ user }: { user: User }) {
  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Mostrar usuario" />

      <div className="overflow-x-auto p-4">
        <Link
          className="mb-4 inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          href={route('usuarios.index')}
        >
          Atrás
        </Link>
        <div>
          <h1 className='text-center text-3xl mb-10'>Mostrar usuario</h1>
          <div className="max-w-xl mx-auto text-lg">
            <p><strong>Nombre:</strong> {user.name}</p>
            <p><strong>Correo electrónico:</strong> {user.email}</p>
          </div>
        </div>
      </div>
    </AppLayout>
  )
}
