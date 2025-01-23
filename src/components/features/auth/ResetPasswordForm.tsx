import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { resetPwSchema } from '@/lib/yup/userSchemas'
import { resetPwService } from '@/services/authService'
import { ErrorBlock } from '@/components/ui/error-block'
import { useFormHandler } from '@/hooks/useFormHandler'
import { Link, useParams, useSearchParams } from 'react-router'

const ResetPasswordFormContent = ({ token, email }: { token: string, email: string }): JSX.Element => {
  const defaultValues = {
    password: '',
    password_confirmation: ''
  }

  const { form, onSubmit } = useFormHandler({
    schema: resetPwSchema,
    defaultValues,
    successMessage: 'Su contraseña se ha restablecido exitosamente.',
    redirectTo: '/ingresar',
    formConfig: { reValidateMode: 'onSubmit' },
    request: async (passwords) => {
      await resetPwService({ token, email, ...passwords })
      window.localStorage.setItem('passwordChanged', 'true')
    },
    onError: ({ form }) => {
      form.resetField('password')
      form.resetField('password_confirmation')
    }
  })

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <ErrorBlock
          message={String(form.formState.errors.email?.message)}
          errorState={Boolean(form.formState.errors.email)}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nueva contraseña</FormLabel>
              <FormControl>
                <Input type='password' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password_confirmation"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirmar contraseña</FormLabel>
              <FormControl>
                <Input type='password' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type='submit'>Actualiza contraseña</Button>
      </form>
    </Form>
  )
}

export default function ResetPasswordForm (): JSX.Element {
  const { token } = useParams()
  const [searchParams] = useSearchParams()
  const email = searchParams.get('email')

  if (typeof token !== 'string' || typeof email !== 'string') {
    return (
      <div className="error-container">
        <h2>¡Ups! Algo salió mal</h2>
        <p>No pudimos identificarte con el token y correo electrónico.</p>
        <Link to='/recuperar-contrasena'>
          <Button>Inténtalo de nuevo</Button>
        </Link>
      </div>
    )
  }

  return <ResetPasswordFormContent token={token} email={email} />
}
