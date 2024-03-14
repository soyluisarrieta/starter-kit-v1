import nProgress from 'nprogress'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { handleValidationErrors } from '@/lib/utils/handleValidationErrors'
import { useYupValidationResolver } from '@/lib/yup/useYupValidationResolver'
import { forgotPwSchema } from '@/lib/yup/userSchemas'
import { csrfService, forgotPwService } from '@/services/authService'
import { useForm } from 'react-hook-form'
import { Button } from '@/components/ui/button'
import { useState, useEffect } from 'react'
import { TimerIcon } from 'lucide-react'

export default function ForgotPasswordForm (): JSX.Element {
  const [isSent, setIsSent] = useState(false)
  const [counter, setCounter] = useState(60) // Nuevo estado para el contador

  useEffect(() => {
    let timer: NodeJS.Timeout
    if (isSent && counter > 0) {
      timer = setInterval(() => { setCounter(counter - 1) }, 1000)
    }
    return () => {
      if (timer) {
        clearInterval(timer)
      }
    }
  }, [isSent, counter])

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
      form.reset()
      setIsSent(true)
    } catch (err: any) {
      console.warn(err)
      handleValidationErrors(err, form.setError)
    } finally {
      nProgress.done()
    }
  }

  return !isSent
    ? (
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

          <Button type='submit'>Reestablecer contraseña</Button>
        </form>
      </Form>
      )
    : (
      <div>
        <h3>¡Listo!</h3>
        <p>Le hemos enviado por correo electrónico el enlace para restablecer su contraseña.</p>
        <p>¿Aún no has recibido el enlace?</p>
        <div className='flex items-center'>
          <Button
            disabled={counter !== 0}
            onClick={() => {
              setIsSent(false)
              setCounter(60)
            }}
          >
            Volver a intentar
          </Button>
          {counter !== 0 && (<><TimerIcon className='ml-3 mr-1' size={16} /> {counter} </>)}
        </div>
      </div>
      )
}
