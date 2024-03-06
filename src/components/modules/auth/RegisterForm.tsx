import nProgress from 'nprogress'
import FormField from '@/components/ui/FormField'
import { Button } from '@/components/ui/button'
import { useAuth } from '@/hooks/useAuth'
import { useYupValidationResolver } from '@/lib/yup/useYupValidationResolver'
import { registerSchema } from '@/lib/yup/userSchemas'
import { useForm } from 'react-hook-form'
import { csrfService, registerService } from '@/services/authService'
import { toast } from 'sonner'
import { MESSAGE } from '@/constants'
import { handleValidationErrors } from '@/lib/utils/handleValidationErrors'

export default function RegisterForm (): JSX.Element {
  const { getProfile } = useAuth()
  const initialValues: RegisterForm = {
    name: '',
    last_name: '',
    email: '',
    password: '',
    password_confirmation: ''
  }

  const resolver = useYupValidationResolver(registerSchema)

  const { handleSubmit, register, formState: { errors }, setError } = useForm({
    resolver,
    defaultValues: initialValues
  })

  // Fn: Send register user data to API
  const onRegister = async (userData: RegisterForm): Promise<void> => {
    nProgress.start()
    try {
      await csrfService()
      await registerService(userData)
      nProgress.inc(0.4)
      await getProfile()
      toast(MESSAGE.WELCOME, { position: 'top-right', duration: 5000 })
    } catch (err) {
      console.warn(err)
      handleValidationErrors(err, setError)
    } finally {
      nProgress.done()
    }
  }

  return (
    <form onSubmit={handleSubmit(onRegister)}>
      <FormField
        id='name'
        label='Nombre'
        register={register}
        error={errors.name}
      />
      <FormField
        id='last_name'
        label='Apellido'
        register={register}
        error={errors.last_name}
      />
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
      <FormField
        id='password_confirmation'
        label='Confirmar contraseña'
        type='password'
        register={register}
        error={errors.password_confirmation}
      />
      <Button type='submit'>Registrarse</Button>
    </form>
  )
}
