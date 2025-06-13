import { type BreadcrumbItem, type SharedData } from '@/types'
import { Transition } from '@headlessui/react'
import { Head, Link, useForm, usePage } from '@inertiajs/react'
import { FormEventHandler } from 'react'
import { InputMask } from '@react-input/mask'

import DeleteUser from '@/components/delete-user'
import HeadingSmall from '@/components/heading-small'
import InputError from '@/components/input-error'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import AppLayout from '@/layouts/app-layout'
import SettingsLayout from '@/layouts/settings/layout'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { DatePicker } from '@/components/ui/date-picker'

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Configuración del perfil',
    href: '/settings/profile'
  }
]

type ProfileForm = {
  name: string;
  lastname: string;
  email: string;
  gender: 'male' | 'female' | 'other';
  birthdate?: string;
  phone?: string;
  address?: string;
};

const genders = [
  {
    id: 'male',
    name: 'Bienvenido',
    description: 'Masculino'
  },
  {
    id: 'female',
    name: 'Bienvenida',
    description: 'Femenina'
  },
  {
    id: 'other',
    name: 'Bienvenid@',
    description: 'Otro'
  }
] as const

export default function Profile ({ mustVerifyEmail, status }: { mustVerifyEmail: boolean; status?: string }) {
  const { auth: { user } } = usePage<SharedData>().props

  const { data, setData, patch, errors, processing, recentlySuccessful } = useForm<Required<ProfileForm>>({
    name: user.name,
    lastname: user.lastname,
    email: user.email,
    gender: user.gender || 'other',
    birthdate: user.birthdate || '',
    phone: user.phone || '',
    address: user.address || ''
  })

  const submit: FormEventHandler = (e) => {
    e.preventDefault()

    patch(route('profile.update'), {
      preserveScroll: true
    })
  }

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Configuración del perfil" />

      <SettingsLayout>
        <div className="space-y-6">
          <HeadingSmall title="Información del perfil" description="Actualiza tu nombre y dirección de correo electrónico" />

          <form onSubmit={submit} className="space-y-6">
            <div className='grid grid-cols-2 gap-2'>
              <div className="grid gap-2">
                <Label htmlFor="name">Nombre</Label>

                <Input
                  id="name"
                  className="mt-1 block w-full"
                  value={data.name}
                  onChange={(e) => setData('name', e.target.value)}
                  required
                  autoComplete="name"
                  placeholder={data.name || 'Nombre'}
                />

                <InputError className="mt-2" message={errors.name} />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="lastname">Apellido</Label>

                <Input
                  id="lastname"
                  className="mt-1 block w-full"
                  value={data.lastname}
                  onChange={(e) => setData('lastname', e.target.value)}
                  required
                  autoComplete="lastname"
                  placeholder={data.lastname || 'Apellido'}
                />

                <InputError className="mt-2" message={errors.name} />
              </div>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="email">Correo electrónico</Label>

              <Input
                id="email"
                type="email"
                className="mt-1 block w-full"
                value={data.email}
                onChange={(e) => setData('email', e.target.value)}
                required
                autoComplete="username"
                placeholder={data.email || 'email@ejemplo.com'}
              />

              <InputError className="mt-2" message={errors.email} />
            </div>

            {mustVerifyEmail && user.email_verified_at === null && (
              <div>
                <p className="-mt-4 text-sm text-muted-foreground">
                  Tu dirección de correo electrónico no está verificada.{' '}
                  <Link
                    href={route('verification.send')}
                    method="post"
                    as="button"
                    className="text-foreground underline decoration-neutral-300 underline-offset-4 transition-colors duration-300 ease-out hover:decoration-current! dark:decoration-neutral-500"
                  >
                    Reenviar el correo de verificación.
                  </Link>
                </p>

                {status === 'verification-link-sent' && (
                  <div className="mt-2 text-sm font-medium text-green-600">
                    Se ha enviado un nuevo enlace de verificación a tu dirección de correo electrónico.
                  </div>
                )}
              </div>
            )}

            <fieldset className="flex flex-col gap-3">
              <legend className="text-sm font-medium">Género</legend>
              <p className="text-muted-foreground text-sm">
                Selecciona tu género para personalizar tu experiencia
              </p>
              <RadioGroup
                className="grid grid-cols-3 gap-3"
                value={data.gender}
                onValueChange={(value: ProfileForm['gender']) => setData('gender', value)}
              >
                {genders.map((gender) => (
                  <Label
                    className="has-[[data-state=checked]]:border-ring has-[[data-state=checked]]:bg-primary/5 flex items-start gap-3 rounded-lg border p-3"
                    key={gender.id}
                  >
                    <RadioGroupItem
                      value={gender.id}
                      id={gender.name}
                      className="data-[state=checked]:border-primary"
                    />
                    <div className="grid gap-1 font-normal">
                      <div className="font-medium">{gender.name}</div>
                      <div className="text-muted-foreground pr-2 text-xs leading-snug text-balance">
                        {gender.description}
                      </div>
                    </div>
                  </Label>
                ))}
              </RadioGroup>
            </fieldset>

            <div className="grid gap-2">
              <Label htmlFor="birthdate">Fecha de nacimiento</Label>

              <DatePicker
                className="mt-1 w-full"
                mode='single'
                defaultValue={data.birthdate ? new Date(`${data.birthdate}T05:00:00.000Z`) : undefined}
                value={data.birthdate ? new Date(data.birthdate) : undefined}
                onValueChange={(date) => setData('birthdate', date ? date.toISOString().split('T')[0] : '')}
                placeholder="Selecciona una fecha"
              />

              <InputError className="mt-2" message={errors.name} />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="phone">Número de teléfono</Label>

              <InputMask
                id="phone"
                className="mt-1 block w-full"
                mask="___ ___ ____"
                replacement={{ _: /\d/ }}
                component={Input}
                type='tel'
                value={data.phone}
                onChange={(e) => setData('phone', e.target.value)}
                autoComplete="phone"
                placeholder={data.phone || '321 456 7890'}
              />

              <InputError className="mt-2" message={errors.name} />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="address">Dirección</Label>

              <Input
                id="address"
                className="mt-1 block w-full"
                value={data.address}
                onChange={(e) => setData('address', e.target.value)}
                autoComplete="address"
                placeholder={data.address || 'Dirección'}
              />

              <InputError className="mt-2" message={errors.name} />
            </div>

            <div className="flex items-center gap-4">
              <Button disabled={processing}>Guardar</Button>

              <Transition
                show={recentlySuccessful}
                enter="transition ease-in-out"
                enterFrom="opacity-0"
                leave="transition ease-in-out"
                leaveTo="opacity-0"
              >
                <p className="text-sm text-neutral-600">Guardado</p>
              </Transition>
            </div>
          </form>
        </div>

        <DeleteUser />
      </SettingsLayout>
    </AppLayout>
  )
}
