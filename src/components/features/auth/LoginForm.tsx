import nProgress from 'nprogress'
import { Button } from '@/components/ui/button'
import { useAuth } from '@/hooks/useAuth'
import { loginSchema } from '@/lib/yup/userSchemas'
import { loginService } from '@/services/authService'
import { MESSAGES } from '@/constants'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useFormHandler } from '@/hooks/useFormHandler'

export default function LoginForm (): JSX.Element {
  const { getProfile } = useAuth()

  // Get before route
  const from: string = (history.state?.from) !== undefined
    ? history.state.from
    : '/'

  const defaultValues = {
    email: '',
    password: ''
  }

  // Form config
  const { form, onSubmit } = useFormHandler({
    schema: loginSchema,
    successMessage: MESSAGES.WELCOME,
    defaultValues,
    redirectTo: from,
    formConfig: { reValidateMode: 'onSubmit' },
    request: async (credentials: Credentials) => {
      await loginService(credentials)
      nProgress.inc(0.4)
      await getProfile()
    },
    onError: ({ form }) => {
      form.resetField('password')
    }
  })

  return (
    <Form {...form}>
      <form onSubmit={onSubmit}>
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

        <Button to='/recuperar-contrasena' variant='link'>
          ¿Olvidaste la contraseña?
        </Button>

        <Button className='w-full mt-4' type='submit' size={'lg'}>Ingresar</Button>
      </form>
    </Form>
  )
}
