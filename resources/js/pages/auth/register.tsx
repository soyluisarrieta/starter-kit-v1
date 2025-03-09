import { Head, useForm } from '@inertiajs/react'
import { LoaderCircle } from 'lucide-react'
import { FormEventHandler } from 'react'

import InputError from '@/components/input-error'
import TextLink from '@/components/text-link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import AuthLayout from '@/layouts/auth-layout'

type RegisterForm = {
    name: string;
    lastname: string;
    email: string;
    password: string;
    password_confirmation: string;
};

export default function Register () {
  const { data, setData, post, processing, errors, reset } = useForm<RegisterForm>({
    name: '',
    lastname: '',
    email: '',
    password: '',
    password_confirmation: ''
  })

  const submit: FormEventHandler = (e) => {
    e.preventDefault()
    post(route('register'), {
      onFinish: () => reset('password', 'password_confirmation')
    })
  }

  return (
    <AuthLayout title="Crear una cuenta" description="Ingresa con tu cuenta para crear una cuenta">
      <Head title="Register" />

      <div className="flex items-center justify-center">
        <Button variant='outline' asChild>
          <a className="w-full" href='/auth/google'>
            <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" width="10px" height="10px" viewBox="-0.5 0 48 48" version="1.1">
              <g id="Icons" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                <g id="Color-" transform="translate(-401.000000, -860.000000)">
                  <g id="Google" transform="translate(401.000000, 860.000000)">
                    <path d="M9.82727273,24 C9.82727273,22.4757333 10.0804318,21.0144 10.5322727,19.6437333 L2.62345455,13.6042667 C1.08206818,16.7338667 0.213636364,20.2602667 0.213636364,24 C0.213636364,27.7365333 1.081,31.2608 2.62025,34.3882667 L10.5247955,28.3370667 C10.0772273,26.9728 9.82727273,25.5168 9.82727273,24" id="Fill-1" fill="#FBBC05"></path>
                    <path d="M23.7136364,10.1333333 C27.025,10.1333333 30.0159091,11.3066667 32.3659091,13.2266667 L39.2022727,6.4 C35.0363636,2.77333333 29.6954545,0.533333333 23.7136364,0.533333333 C14.4268636,0.533333333 6.44540909,5.84426667 2.62345455,13.6042667 L10.5322727,19.6437333 C12.3545909,14.112 17.5491591,10.1333333 23.7136364,10.1333333" id="Fill-2" fill="#EB4335"></path>
                    <path d="M23.7136364,37.8666667 C17.5491591,37.8666667 12.3545909,33.888 10.5322727,28.3562667 L2.62345455,34.3946667 C6.44540909,42.1557333 14.4268636,47.4666667 23.7136364,47.4666667 C29.4455,47.4666667 34.9177955,45.4314667 39.0249545,41.6181333 L31.5177727,35.8144 C29.3995682,37.1488 26.7323182,37.8666667 23.7136364,37.8666667" id="Fill-3" fill="#34A853"> </path>
                    <path d="M46.1454545,24 C46.1454545,22.6133333 45.9318182,21.12 45.6113636,19.7333333 L23.7136364,19.7333333 L23.7136364,28.8 L36.3181818,28.8 C35.6879545,31.8912 33.9724545,34.2677333 31.5177727,35.8144 L39.0249545,41.6181333 C43.3393409,37.6138667 46.1454545,31.6490667 46.1454545,24" id="Fill-4" fill="#4285F4"></path>
                  </g>
                </g>
              </g>
            </svg>
            <strong>Continuar con Google</strong>
          </a>
        </Button>
      </div>

      <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
        <span className="relative z-10 bg-background px-2 text-muted-foreground">
          O regístrate con
        </span>
      </div>

      <form className="flex flex-col gap-6" onSubmit={submit}>
        <div className="grid gap-6">
          <div className="grid gap-2 grid-cols-2">
            <div className='col-span-1'>
              <Label htmlFor="name">Nombre</Label>
              <Input
                id="name"
                type="text"
                required
                autoFocus
                tabIndex={1}
                autoComplete="name"
                value={data.name}
                onChange={(e) => setData('name', e.target.value)}
                disabled={processing}
                placeholder="Ingresa tu nombre"
              />
              <InputError message={errors.name} className="mt-2" />
            </div>

            <div className='col-span-1'>
              <Label htmlFor="lastname">Apellido</Label>
              <Input
                id="lastname"
                type="text"
                required
                tabIndex={2}
                autoComplete="lastname"
                value={data.lastname}
                onChange={(e) => setData('lastname', e.target.value)}
                disabled={processing}
                placeholder="Ingresa tu apellido"
              />
              <InputError message={errors.lastname} className="mt-2" />
            </div>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="email">Correo electrónico</Label>
            <Input
              id="email"
              type="email"
              required
              tabIndex={3}
              autoComplete="email"
              value={data.email}
              onChange={(e) => setData('email', e.target.value)}
              disabled={processing}
              placeholder="correo@ejemplo.com"
            />
            <InputError message={errors.email} />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="password">Contraseña</Label>
            <Input
              id="password"
              type="password"
              required
              tabIndex={4}
              value={data.password}
              onChange={(e) => setData('password', e.target.value)}
              disabled={processing}
              placeholder="**********"
            />
            <InputError message={errors.password} />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="password_confirmation">Confirmar contraseña</Label>
            <Input
              id="password_confirmation"
              type="password"
              required
              tabIndex={5}
              value={data.password_confirmation}
              onChange={(e) => setData('password_confirmation', e.target.value)}
              disabled={processing}
              placeholder="**********"
            />
            <InputError message={errors.password_confirmation} />
          </div>

          <Button type="submit" className="mt-2 w-full" tabIndex={6} disabled={processing}>
            {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
            Crear cuenta
          </Button>
        </div>

        <div className="text-muted-foreground text-center text-sm">
          ¿Ya tienes una cuenta?{' '}
          <TextLink href={route('login')} tabIndex={6}>
            Inicia sesión
          </TextLink>
        </div>
      </form>
    </AuthLayout>
  )
}
