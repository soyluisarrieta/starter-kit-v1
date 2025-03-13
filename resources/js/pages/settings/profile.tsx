import { User, type BreadcrumbItem, type SharedData } from '@/types'
import { Transition } from '@headlessui/react'
import { Head, Link, router, useForm, usePage } from '@inertiajs/react'
import { FormEventHandler, useEffect, useRef, useState } from 'react'

import DeleteUser from '@/components/delete-user'
import HeadingSmall from '@/components/heading-small'
import InputError from '@/components/input-error'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import AppLayout from '@/layouts/app-layout'
import SettingsLayout from '@/layouts/settings/layout'
import { Checkbox } from '@/components/ui/checkbox'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import DatePicker from '@/components/ui/datepicker'
import { PhoneInput } from '@/components/ui/phone-input'
import { Country } from 'react-phone-number-input'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { useInitials } from '@/hooks/use-initials'
import { UploadIcon } from 'lucide-react'
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogTitle, DialogTrigger } from '@/components/ui/dialog'

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Ajustes de perfil',
    href: '/ajustes/perfil'
  }
]

export default function Profile ({ mustVerifyEmail, status }: { mustVerifyEmail: boolean; status?: string }) {
  const [profilePicture, setProfilePicture] = useState<string | null>(null)
  const [country, setCountry] = useState<Country>()

  const { auth } = usePage<SharedData>().props
  const { data, setData, patch, errors, processing, recentlySuccessful } = useForm({
    name: auth.user.name,
    lastname: auth.user.lastname,
    avatar: auth.user.avatar,
    gender: auth.user.gender,
    birthdate: auth.user.birthdate,
    address: auth.user.address,
    phone: auth.user.phone,
    has_whatsapp: auth.user.has_whatsapp,
    email: auth.user.email
  })

  // Update profile
  const submit: FormEventHandler = (e) => {
    e.preventDefault()
    patch(route('profile.update'), {
      preserveScroll: true,
      except: ['avatar']
    })
  }

  // Update and preview avatar
  const updateAvatar = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    router.post(route('profile.update'), {
      _method: 'patch',
      ...auth.user,
      avatar: file
    }, {
      preserveScroll: true,
      forceFormData: true,
      onSuccess: () => {
        const imageUrl = URL.createObjectURL(file)
        setProfilePicture(imageUrl)
      }
    })
  }

  // Remove avatar
  const removeAvatar = () => {
    router.patch(route('profile.update'), {
      ...auth.user,
      avatar: null
    }, {
      preserveScroll: true,
      onSuccess: () => {
        setProfilePicture('')
      }
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
          <HeadingSmall title="Información del perfil" description="Actualice su información personal de la cuenta" />

          <div className='flex items-center gap-3'>
            <div className="relative">
              <Avatar className="size-20 overflow-hidden rounded-full cursor-crosshair" onClick={uploadAvatar}>
                <AvatarImage
                  className='object-cover'
                  src={profilePicture ?? (data.avatar && `/storage/avatars/${data.avatar}`) ?? undefined}
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
                  <Button className='hover:bg-destructive' variant='ghost' size='sm' disabled={!data.avatar}>
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

          <form
            onSubmit={submit}
            className="space-y-6"
          >
            <div className="grid gap-2">
              <Label htmlFor="name">Nombre</Label>
              <Input
                id="name"
                className="mt-1 block w-full"
                value={data.name}
                onChange={(e) => setData('name', e.target.value)}
                required
                autoComplete="name"
                placeholder={data.name}
              />

              <InputError
                className="mt-2"
                message={errors.name}
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="lastname">Apellidos</Label>
              <Input
                id="lastname"
                className="mt-1 block w-full"
                value={data.lastname}
                onChange={(e) => setData('lastname', e.target.value)}
                required
                autoComplete="lastname"
                placeholder={data.lastname}
              />

              <InputError
                className="mt-2"
                message={errors.lastname}
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="birthdate">Fecha de nacimiento</Label>

              <DatePicker
                id='birthdate'
                mode='single'
                value={data?.birthdate ?? undefined}
                onChange={(value) => value && setData('birthdate', value)}
              />

              <InputError className="mt-2" message={errors.birthdate} />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="gender">Género</Label>
              <p className='text-xs text-muted-foreground mb-1'>
                ¿Cómo prefieres ser tratad
                {data.gender === 'male' ? 'o' : data.gender === 'female' ? 'a' : '@'}
                {' '}
                en la aplicación?
              </p>

              <RadioGroup
                className='-space-y-1'
                name='gender'
                value={data.gender}
                required
                onValueChange={(value: User['gender']) => setData('gender', value)}
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem
                    id='male-gender'
                    value='male'
                  />
                  <Label
                    htmlFor="male-gender"
                    className='text-sm text-muted-foreground'
                  >
                    Masculino
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem
                    id='female-gender'
                    value='female'
                  />
                  <Label
                    htmlFor="female-gender"
                    className='text-sm text-muted-foreground'
                  >
                    Femenino
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem
                    id='other-gender'
                    value='other'
                  />
                  <Label
                    htmlFor="other-gender"
                    className='text-sm text-muted-foreground'
                  >
                    Prefiero no decirlo
                  </Label>
                </div>
              </RadioGroup>

              <InputError
                className="mt-2"
                message={errors.gender}
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="phone">Número de contacto</Label>
              <PhoneInput
                id='phone'
                className="mt-1 w-full"
                defaultCountry={country ?? 'CO'}
                value={data.phone ?? undefined}
                onChange={value => setData('phone', value)}
                onCountryChange={setCountry}
              />

              <InputError
                className="mt-2"
                message={errors.phone}
              />

              <div className='flex gap-2'>
                <Checkbox
                  id='has_whatsapp'
                  name='has_whatsapp'
                  checked={Boolean(data.has_whatsapp)}
                  onCheckedChange={(isCheck: boolean) => setData('has_whatsapp', isCheck)}
                />
                <Label
                  htmlFor="has_whatsapp"
                  className='text-xs text-muted-foreground'
                >
                  ¿Tienes WhatsApp?
                </Label>
              </div>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="address">Dirección de residencia</Label>
              <Input
                id="address"
                type="address"
                className="mt-1 block w-full"
                value={data.address ?? ''}
                placeholder={data.address ?? ''}
                onChange={(e) => setData('address', e.target.value)}
              />

              <InputError className="mt-2" message={errors.address} />
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
                autoComplete="email"
                placeholder={data.email}
              />

              <InputError className="mt-2" message={errors.email} />
            </div>

            {!mustVerifyEmail && auth.user.email_verified_at === null && (
              <div>
                <p className="-mt-4 text-sm text-muted-foreground">
                  Su dirección de correo electrónico no está verificada.{' '}
                  <Link
                    href={route('verification.send')}
                    method="post"
                    as="button"
                    className="hover:decoration-current! text-foreground underline decoration-neutral-300 underline-offset-4 transition-colors duration-300 ease-out dark:decoration-neutral-500"
                  >
                    Haga clic aquí para reenviar el correo electrónico de verificación.
                  </Link>
                </p>

                {status === 'verification-link-sent' && (
                  <div className="mt-2 text-sm font-medium text-green-600">
                    Se ha enviado un nuevo enlace de verificación a su dirección de correo electrónico.
                  </div>
                )}
              </div>
            )}

            <div className="flex items-center gap-4">
              <Button disabled={processing}>Guardar cambios</Button>

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
