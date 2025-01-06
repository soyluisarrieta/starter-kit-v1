import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { forgotPwSchema } from '@/lib/yup/userSchemas'
import { forgotPwService } from '@/services/authService'
import { Button } from '@/components/ui/button'
import { useFormHandler } from '@/hooks/useFormHandler'

interface Props {
  setIsLinkSent: React.Dispatch<React.SetStateAction<boolean>>
  resetCounter?: () => void
}

export default function ForgotPasswordForm ({ setIsLinkSent, resetCounter }: Props): JSX.Element {
  // Form config
  const { form, onSubmit } = useFormHandler({
    schema: forgotPwSchema,
    defaultValues: { email: '' },
    request: async (email: { email: string }) => {
      await forgotPwService(email)
      setIsLinkSent(true)
      resetCounter && resetCounter()
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

        <Button type='submit'>Reestablecer contraseña</Button>
      </form>
    </Form>
  )
}
