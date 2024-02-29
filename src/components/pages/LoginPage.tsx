import { loginSchema } from '@/lib/yup/userSchemas'
import { useForm } from 'react-hook-form'
import { Button } from '@/components/ui/button'
import { useYupValidationResolver } from '@/lib/yup/useYupValidationResolver'
import FormField from '@/components/ui/FormField'

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
        <FormField
          id='email'
          label='Correo electrónico'
          register={register}
          error={errors.email}
        />
        <FormField
          id='password'
          label='Contraseña'
          type='password'
          register={register}
          error={errors.password}
        />
        <Button type='submit'>Ingresar</Button>
      </form>
    </main>
  )
}
