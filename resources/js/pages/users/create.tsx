import { Button } from '@/components/ui/button'
import AppLayout from '@/layouts/app-layout'
import FormUser from '@/pages/users/form'
import { type BreadcrumbItem } from '@/types'
import { Head, Link, useForm } from '@inertiajs/react'

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Crear usuario',
    href: '/usuarios'
  }
]

export default function CreateUser () {
  const form = useForm({
    name: '',
    lastname: '',
    email: ''
  })

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    form.post(route('usuarios.guardar'))
  }

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Crear usuario" />

      <div className="overflow-x-auto p-4">
        <Link
          className="mb-4 inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          href={route('usuarios.index')}
        >
          Atrás
        </Link>
        <div>
          <h1 className='text-center text-3xl mb-10'>Crear usuario</h1>
          <form
            className="space-y-6 mt-4 max-w-md mx-auto"
            onSubmit={onSubmit}
          >
            <FormUser {...form} />
            <Button type="submit">
              Crear
            </Button>
          </form>
        </div>
      </div>
    </AppLayout>
  )
}
