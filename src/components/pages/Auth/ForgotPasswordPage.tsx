import nProgress from 'nprogress'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { useYupValidationResolver } from '@/lib/yup/useYupValidationResolver'
import { forgotPwSchema } from '@/lib/yup/userSchemas'
import { useForm } from 'react-hook-form'
import { Link } from 'wouter'
import { handleValidationErrors } from '@/lib/utils/handleValidationErrors'
import { csrfService, forgotPwService } from '@/services/authService'
import { Input } from '@/components/ui/input'
import { toast } from 'sonner'

export default function ForgotPassword (): JSX.Element {
  // Form config
  const form = useForm({
    resolver: useYupValidationResolver(forgotPwSchema),
    defaultValues: { email: '' }
  })

  // Fn: Send forgot password to API
  const onForgotPassword = async (email: { email: string }): Promise<void> => {
    nProgress.start()
    try {
      await csrfService()
      await forgotPwService(email)
      toast('¡Enlace de recuperación enviado!', { position: 'top-right', duration: 5000 })
      form.reset()
    } catch (err: any) {
      console.warn(err)
      handleValidationErrors(err, form.setError)
    }
  }

  return (
    <main>
      <h1>Recuperar contraseña</h1>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onForgotPassword)}>
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

          <Button type='submit'>Enviar link</Button>
        </form>
      </Form>

      <div>
        <Link to='/registrarse'>
          <Button variant='link'>
            ¿Deseas volver a intentar?
          </Button>
        </Link>
      </div>
      <div>
        ¿No tienes una cuenta?
        <Link to='/registrarse'>
          <Button variant='link'>
            Regístrate
          </Button>
        </Link>
      </div>
    </main>
  )
}
