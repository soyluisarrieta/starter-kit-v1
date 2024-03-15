import nProgress from 'nprogress'
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
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'

export default function LoginForm (): JSX.Element {
  const { getProfile } = useAuth()

  // Form config
  const form = useForm({
    resolver: useYupValidationResolver(loginSchema),
    defaultValues: {
      email: '',
      password: ''
    }
  })

  // Get before route
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

      navigate(from, { replace: true })
      toast(MESSAGE.WELCOME, { position: 'top-right', duration: 5000 })
    } catch (err: any) {
      console.warn(err)
      handleValidationErrors(err, form.setError)
      form.setValue('password', '')
    } finally {
      nProgress.done()
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onLogin)}>
        <FormField
          control={form.control}
          name='email'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Correo electrónico</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='password'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Contraseña</FormLabel>
              <FormControl>
                <Input type='password' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type='submit'>Ingresar</Button>
      </form>
    </Form>
  )
}
