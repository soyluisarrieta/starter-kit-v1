import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { forgotPwSchema } from '@/lib/yup/userSchemas'
import { forgotPwService } from '@/services/authService'
import { Button } from '@/components/ui/button'
import { useState, useEffect } from 'react'
import { TimerIcon } from 'lucide-react'
import { useFormHandler } from '@/hooks/useFormHandler'

export default function ForgotPasswordForm (): JSX.Element {
  const [isSent, setIsSent] = useState(false)
  const [counter, setCounter] = useState(60)

  useEffect(() => {
    if (!counter) return
    const intervalId = setInterval(() => {
      setCounter(counter - 1)
    }, 1000)
    return () => { clearInterval(intervalId) }
  }, [counter])

  // Form config
  const { form, onSubmit } = useFormHandler({
    schema: forgotPwSchema,
    defaultValues: { email: '' },
    request: async (email: { email: string }) => {
      await forgotPwService(email)
      setIsSent(true)
    }
  })

  return !isSent
    ? (
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
