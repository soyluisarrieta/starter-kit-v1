import FormField from '@/components/ui/FormField'
import { Button } from '@/components/ui/button'
import { useAuth } from '@/hooks/useAuth'
import { useYupValidationResolver } from '@/lib/yup/useYupValidationResolver'
import { loginSchema } from '@/lib/yup/userSchemas'
import { useForm } from 'react-hook-form'

export default function LoginForm (): JSX.Element {
  const { login } = useAuth()
  const initialValues: Credentials = { email: '', password: '' }
  const resolver = useYupValidationResolver(loginSchema)

  const { handleSubmit, register, formState: { errors } } = useForm({
    resolver,
    defaultValues: initialValues
  })
  return (
    <form onSubmit={handleSubmit(login)}>
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
  )
}
