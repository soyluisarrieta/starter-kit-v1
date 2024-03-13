import nProgress from 'nprogress'
import { Button } from '@/components/ui/button'
import { useAuth } from '@/hooks/useAuth'
import { useYupValidationResolver } from '@/lib/yup/useYupValidationResolver'
import { registerSchema } from '@/lib/yup/userSchemas'
import { useForm } from 'react-hook-form'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { csrfService, registerService } from '@/services/authService'
import { toast } from 'sonner'
import { MESSAGE } from '@/constants'
import { handleValidationErrors } from '@/lib/utils/handleValidationErrors'

export default function RegisterForm (): JSX.Element {
  const { getProfile } = useAuth()

  // Form config
  const form = useForm({
    resolver: useYupValidationResolver(registerSchema),
    defaultValues: {
      name: '',
      last_name: '',
      gender: undefined,
      email: '',
      password: '',
      password_confirmation: ''
    }
  })

  // Fn: Send register user data to API
  const onRegister = async (userData: RegisterForm): Promise<void> => {
    nProgress.start()

    try {
      await csrfService()
      await registerService(userData)
      nProgress.inc(0.4)
      await getProfile()
      toast(MESSAGE.WELCOME, { position: 'top-right', duration: 5000 })
    } catch (err) {
      console.warn(err)
      handleValidationErrors(err, form.setError)
    } finally {
      nProgress.done()
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onRegister)}>
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nombre</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="last_name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Apellido</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

         <FormField
          control={form.control}
          name="gender"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel>Género</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex flex-col space-y-1"
                >
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="male" />
                    </FormControl>
                    <FormLabel className="font-normal">
                      Masculino
                    </FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="female" />
                    </FormControl>
                    <FormLabel className="font-normal">
                      Femenino
                    </FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="other2" />
                    </FormControl>
                    <FormLabel className="font-normal">Otro</FormLabel>
                  </FormItem>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
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
          name="password"
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

        <Button type='submit'>Registrarse</Button>
      </form>
    </Form>
  )
}
