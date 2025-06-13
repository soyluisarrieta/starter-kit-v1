import InputError from '@/components/input-error'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import type { InertiaFormProps } from '@inertiajs/react'

type UserForm = {
  name: string;
  lastname: string;
  email: string;
}

export default function FormUser (form: InertiaFormProps<UserForm>) {
  const { data, setData, errors, processing } = form
  return (
    <>
      <div className="grid gap-2">
        <Label htmlFor="name">Nombre</Label>
        <Input
          id="name"
          type="text"
          autoFocus
          tabIndex={1}
          autoComplete="name"
          value={data.name}
          onChange={(e) => setData('name', e.target.value)}
          disabled={processing}
          placeholder="Nombre"
        />
        <InputError message={errors.name} className="mt-2" />
      </div>

      <div className="grid gap-2">
        <Label htmlFor="lastname">Apellido</Label>
        <Input
          id="lastname"
          type="text"
          autoFocus
          tabIndex={1}
          autoComplete="lastname"
          value={data.lastname}
          onChange={(e) => setData('lastname', e.target.value)}
          disabled={processing}
          placeholder="Apellido"
        />
        <InputError message={errors.lastname} className="mt-2" />
      </div>

      <div className="grid gap-2">
        <Label htmlFor="email">Correo electrónico</Label>
        <Input
          id="email"
          type="email"
          tabIndex={2}
          autoComplete="email"
          value={data.email}
          onChange={(e) => setData('email', e.target.value)}
          disabled={processing}
          placeholder="email@ejemplo.com"
        />
        <InputError message={errors.email} className="mt-2" />
      </div>
    </>
  )
}
