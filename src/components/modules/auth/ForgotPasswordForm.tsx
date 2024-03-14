import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { handleValidationErrors } from '@/lib/utils/handleValidationErrors'
import { useYupValidationResolver } from '@/lib/yup/useYupValidationResolver'
import { forgotPwSchema } from '@/lib/yup/userSchemas'
import { csrfService, forgotPwService } from '@/services/authService'
import nProgress from 'nprogress'
import { Button } from 'react-day-picker'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

export default function ForgotPasswordForm (): JSX.Element {
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
    } finally {
      nProgress.done()
    }
  }
  return (
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
  )
}
