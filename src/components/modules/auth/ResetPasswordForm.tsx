import nProgress from 'nprogress'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useYupValidationResolver } from '@/lib/yup/useYupValidationResolver'
import { resetPwSchema } from '@/lib/yup/userSchemas'
import { useForm } from 'react-hook-form'
import { Link, useParams, useSearch } from 'wouter'
import { csrfService, resetPwService } from '@/services/authService'
import { handleValidationErrors } from '@/lib/utils/handleValidationErrors'
import { toast } from 'sonner'
import { navigate } from 'wouter/use-browser-location'
import { ErrorBlock } from '@/components/ui/error-block'

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

  // Form config
  const form = useForm({
    resolver: useYupValidationResolver(resetPwSchema),
    defaultValues: {
      password: '',
      password_confirmation: ''
    },
    reValidateMode: 'onSubmit'
  })

  // fn: Send new password to API
  const onResetPassoword = async (passwords: { password: string, password_confirmation: string }): Promise<void> => {
    nProgress.start()
    try {
      await csrfService()
      await resetPwService({ token, email, ...passwords })
      toast.success('Su contraseña ha sido restablecida', { position: 'top-right', duration: 5000 })
      navigate('/ingresar', { replace: true })
    } catch (err: any) {
      console.warn(err)
      handleValidationErrors(err, form.setError)
      form.resetField('password')
      form.resetField('password_confirmation')
    } finally {
      nProgress.done()
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onResetPassoword)}>
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
