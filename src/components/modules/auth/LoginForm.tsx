import nProgress from 'nprogress'
import FormField from '@/components/ui/FormField'
import { Button } from '@/components/ui/button'
import { useAuth } from '@/hooks/useAuth'
import { useYupValidationResolver } from '@/lib/yup/useYupValidationResolver'
import { loginSchema } from '@/lib/yup/userSchemas'
import { useForm } from 'react-hook-form'
import { csrfService, loginService } from '@/services/authService'
import { navigate } from 'wouter/use-browser-location'
import { toast } from 'sonner'
import { MESSAGE } from '@/constants'
import { handleValidationErrors } from '@/lib/utils/handleValidationErrors'

export default function LoginForm (): JSX.Element {
  const { getProfile } = useAuth()
  const initialValues: Credentials = { email: '', password: '' }
  const resolver = useYupValidationResolver(loginSchema)

  const { handleSubmit, register, formState: { errors }, setError } = useForm({
    resolver,
    defaultValues: initialValues
  })

  const from: string = (history.state?.from) !== undefined
    ? history.state.from
    : '/'

  // Fn: Send login credentials to API
  const onLogin = async (credentials: Credentials): Promise<void> => {
    nProgress.start()
    try {
      await csrfService()
      await loginService(credentials)
      nProgress.inc(0.4)
      await getProfile()

      navigate(from)
      toast(MESSAGE.WELCOME, { position: 'top-right', duration: 5000 })
    } catch (err: any) {
      console.warn(err)
      handleValidationErrors(err, setError)
    } finally {
      nProgress.done()
    }
  }

  return (
    <form onSubmit={handleSubmit(onLogin)}>
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
