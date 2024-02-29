import { loginSchema } from '@/lib/yup/userSchemas'
import { useForm } from 'react-hook-form'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { useYupValidationResolver } from '@/lib/yup/useYupValidationResolver'

interface LoginFormValues {
  email: string
  password: string
}

export default function LoginPage (): JSX.Element {
  const initialValues: LoginFormValues = { email: '', password: '' }
  const resolver = useYupValidationResolver(loginSchema)
  const { handleSubmit, register, formState: { errors } } = useForm({
    resolver,
    defaultValues: initialValues
  })

  const onSubmit = (data: LoginFormValues): void => {
    console.log({ data })
  }

  return (
    <main>
      <h1>Iniciar sesión</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Label htmlFor='email'>Correo electrónico</Label>
        <Input id='email' {...register('email')} />
        {errors.email && (
          <div role="alert">{errors.email.message?.toString()}</div>
        )}

        <Label htmlFor='password'>Contraseña</Label>
        <Input id='password' type='password' {...register('password')} />
        {errors.password && (
          <div role="alert">{errors.password.message?.toString()}</div>
        )}

        <Button type='submit'>Ingresar</Button>
      </form>
    </main>
  )
}
