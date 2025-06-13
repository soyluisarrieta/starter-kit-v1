import { type BreadcrumbItem, type SharedData } from '@/types'
import { Transition } from '@headlessui/react'
import { Head, Link, router, useForm, usePage } from '@inertiajs/react'
import { FormEventHandler, useEffect, useRef, useState } from 'react'
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
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { useInitials } from '@/hooks/use-initials'
import { UploadIcon } from 'lucide-react'
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogTitle, DialogTrigger } from '@/components/ui/dialog'

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
  avatar?: string;
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
  const [avatarButtonState, setAvatarButtonState] = useState(false)
  const { auth: { user } } = usePage<SharedData>().props

  const { data, setData, patch, errors, processing, recentlySuccessful } = useForm<Required<ProfileForm>>({
    name: user.name,
    lastname: user.lastname,
    email: user.email,
    avatar: user.avatar || '',
    gender: user.gender || 'other',
    birthdate: user.birthdate || '',
    phone: user.phone || '',
    address: user.address || ''
  })

  useEffect(() => {
    setAvatarButtonState(user.avatar ? true : false)
  },[user.avatar])

  const submit: FormEventHandler = (e) => {
    e.preventDefault()

    patch(route('profile.update'), {
      preserveScroll: true
    })
  }

  // Update and preview avatar
  const updateAvatar = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    router.post(route('profile.update'), {
      _method: 'patch',
      ...user,
      avatar: file
    }, {
      preserveScroll: true,
      forceFormData: true
    })
  }

  // Remove avatar
  const removeAvatar = () => {
    router.patch(route('profile.update'), {
      ...user,
      avatar: null
    }, {
      preserveScroll: true
    })
  }

  // Upload avatar
  const getInitials = useInitials()
  const inputRef = useRef<HTMLInputElement | null>(null)
  const uploadAvatar = () => {
    if (inputRef.current) {
      inputRef.current.click()
    }
  }

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Configuración del perfil" />

      <SettingsLayout>
        <div className="space-y-6">
          <HeadingSmall title="Información del perfil" description="Actualiza tu nombre y dirección de correo electrónico" />

          <div className='flex items-center gap-3'>
            <div className="relative">
              <Avatar className="size-20 overflow-hidden rounded-full cursor-crosshair" onClick={uploadAvatar}>
                <AvatarImage
                  className='object-cover'
                  src={user.avatar ? `/storage/avatars/${user.avatar}` : undefined}
                  alt={data.name}
                />
                <AvatarFallback className="rounded-lg bg-neutral-200 text-black dark:bg-neutral-700 dark:text-white">
                  {getInitials(`${data.name} ${data.lastname}`)}
                </AvatarFallback>
              </Avatar>
              <input
                className='hidden'
                type="file"
                accept="image/png, image/jpeg, image/webp"
                ref={inputRef}
                onChange={updateAvatar}
              />
            </div>

            <div className="flex flex-col [&>button]:self-start gap-1 pt-2">
              <Button variant='outline' onClick={uploadAvatar}>
                <UploadIcon />
                Actualizar foto
              </Button>

              <Dialog>
                <DialogTrigger asChild>
                  <Button
                    className='hover:bg-destructive'
                    variant='ghost'
                    size='sm'
                    disabled={!avatarButtonState}
                  >
                    Eliminar
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogTitle>¿Estás seguro de que deseas eliminar tu foto?</DialogTitle>
                  <DialogDescription>
                    Una vez que se elimine su foto no podrá ser recuperada, y se eliminarán de forma permanente.
                  </DialogDescription>

                  <DialogFooter className="gap-2">
                    <DialogClose asChild>
                      <Button variant="secondary">
                        Cancelar
                      </Button>
                    </DialogClose>
                    <DialogClose asChild>
                      <Button variant="destructive" onClick={removeAvatar}>
                        Eliminar foto
                      </Button>
                    </DialogClose>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </div>

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
