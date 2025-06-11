import InputError from '@/components/input-error'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import AppLayout from '@/layouts/app-layout'
import { type BreadcrumbItem } from '@/types'
import { Head, Link, useForm } from '@inertiajs/react'

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Crear usuario',
    href: '/usuarios'
  }
]

export default function CreateUsers () {
  const { data, setData, errors, processing, post } = useForm({
    name: '',
    email: ''
  })

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    post(route('usuarios.guardar'))
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
            <div className="grid gap-2">
              <Label htmlFor="name">Nombre completo</Label>
              <Input
                id="name"
                type="text"
                autoFocus
                tabIndex={1}
                autoComplete="name"
                value={data.name}
                onChange={(e) => setData('name', e.target.value)}
                disabled={processing}
                placeholder="Nombre y Apellido"
              />
              <InputError message={errors.name} className="mt-2" />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="email">Correo electrónico</Label>
              <Input
                id="email"
                type="text"
                autoFocus
                tabIndex={1}
                autoComplete="email"
                value={data.email}
                onChange={(e) => setData('email', e.target.value)}
                disabled={processing}
                placeholder="email@ejemplo.com"
              />
              <InputError message={errors.email} className="mt-2" />
            </div>

            <Button type="submit">
              Crear
            </Button>
          </form>
        </div>
      </div>
    </AppLayout>
  )
}
