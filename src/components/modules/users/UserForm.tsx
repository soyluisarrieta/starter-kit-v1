import { Button } from '@/components/ui/button'
import { createUserSchema } from '@/lib/yup/userSchemas'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useFormHandler } from '@/hooks/useFormHandler'
import DatePicker from '@/components/ui/datepicker'
import { ACCEPTED_IMAGES } from '@/constants'
import { createUserService, updateUserService } from '@/services/userService'

interface UserFormProps {
  user?: ProfileAuth
  callback?: (formData: ProfileAuth) => void
}

export default function UserForm ({ user, callback }: UserFormProps) {
  const defaultValues = {
    name: user?.name ?? '',
    last_name: user?.last_name ?? '',
    gender: user?.gender ?? undefined,
    email: user?.email ?? ''
  }

  const { form, onSubmit } = useFormHandler({
    schema: createUserSchema,
    defaultValues,
    successMessage: `El usuario ha sido ${user ? 'actualizado' : 'creado'} con exito.`,
    formConfig: { reValidateMode: 'onSubmit' },
    request: async (formData: ProfileAuth) => {
      const data: ProfileAuth = user
        ? await updateUserService({ ...formData, id: user.id })
        : await createUserService(formData)
      await callback?.(data)
    }
  })

  return (
    <Form {...form}>
      <form className='space-y-2' onSubmit={onSubmit}>
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
            <FormItem className="space-y-2">
              <FormLabel>Género</FormLabel>
              <FormMessage />
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormItem className="flex items-center space-x-3 mb-0">
                    <FormControl>
                      <RadioGroupItem value="male" />
                    </FormControl>
                    <FormLabel className="font-normal">
                      Masculino
                    </FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 mb-0">
                    <FormControl>
                      <RadioGroupItem value="female" />
                    </FormControl>
                    <FormLabel className="font-normal">
                      Femenino
                    </FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 mb-0">
                    <FormControl>
                      <RadioGroupItem value="other" />
                    </FormControl>
                    <FormLabel className="font-normal">Otro</FormLabel>
                  </FormItem>
                </RadioGroup>
              </FormControl>
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

        {/* Only update form */}
        {user && (
          <>
            <FormField
              control={form.control}
              name='birthdate'
              render={({ field }) => (
                <FormItem className='w-full flex flex-col'>
                  <FormLabel>Fecha de nacimiento</FormLabel>
                  <FormControl>
                    <DatePicker
                      onChange={field.onChange}
                      value={field.value}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="avatar"
              render={({ field: { value, onChange, ...fieldProps } }) => (
                <FormItem>
                  <FormLabel>Imagen de perfil</FormLabel>
                  <FormControl>
                    <Input
                      {...fieldProps}
                      placeholder="Avatar"
                      type="file"
                      accept={ACCEPTED_IMAGES}
                      onChange={(event) => { onChange(event.target.files?.[0]) }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='phone'
              render={({ field }) => (
                <FormItem className='w-full'>
                  <FormLabel>Número de teléfono</FormLabel>
                  <FormControl>
                    <Input placeholder={'Opcional'} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </>
        )}

        <div>
          <Button className='w-full mt-4' type='submit' size='lg'>{user ? 'Actualizar' : 'Añadir'}</Button>
        </div>
      </form>
    </Form>
  )
}
