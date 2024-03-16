import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { resetPwSchema } from '@/lib/yup/userSchemas'
import { Link, useParams, useSearch } from 'wouter'
import { resetPwService } from '@/services/authService'
import { ErrorBlock } from '@/components/ui/error-block'
import { useFormHandler } from '@/hooks/useFormHandler'

export default function ResetPasswordForm (): JSX.Element {
  const { token } = useParams()
  const params = new URLSearchParams(useSearch())
  const email = params.get('email')

  // Validating if typeof is string
  if (typeof token !== 'string' || typeof email !== 'string') {
    return (
      <div className="error-container">
        <h2>¡Ups! Algo salió mal</h2>
        <p>No pudimos identificarte con el token y correo electrónico.</p>
        <Link href='/recuperar-contrasena'>
          <Button>Inténtalo de nuevo</Button>
        </Link>
      </div>
    )
  }

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
    request: async (passwords: { password: string, password_confirmation: string }) => {
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
