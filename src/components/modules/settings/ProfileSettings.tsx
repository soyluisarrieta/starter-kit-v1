import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Separator } from '@/components/ui/separator'
import { ACCEPTED_IMAGES } from '@/constants'
import { useAuth } from '@/hooks/useAuth'
import { useFormHandler } from '@/hooks/useFormHandler'
import { profileSchema } from '@/lib/yup/userSchemas'

export default function ProfileSettings (): JSX.Element {
  const { profile } = useAuth()
  const defaultValues = {
    name: profile?.name,
    last_name: profile?.last_name,
    email: profile?.email,
    gender: profile?.gender,
    birthdate: profile?.birthdate ?? '',
    phone: profile?.phone ?? '',
    avatar: profile?.avatar
  }

  const { form } = useFormHandler({
    formHeader: {
      title: 'Perfil de Usuario',
      description: 'Administra tu información personal y preferencias de cuenta.'
    },
    schema: profileSchema,
    successMessage: 'Perfil actualizado con éxito.',
    defaultValues,
    timestamps: {
      updatedAt: profile?.updated_at,
      createdAt: profile?.created_at
    },
    request: async (userData) => {
      console.log(userData)
    }
  })

  return (
    <>
      <Form {...form}>
        <div className='grid md:grid-cols-2 gap-4 p-6'>
          <div>
            <h3 className='font-semibold text-lg'>Nombre y Apellido</h3>
            <p className='font-normal leading-snug text-muted-foreground'>Introduzca un nombre y apellido</p>
          </div>
          <div className='flex gap-2'>
            <FormField
              control={form.control}
              name='name'
              render={({ field }) => (
                <FormItem className='w-full'>
                  <FormControl>
                    <Input placeholder={profile?.name} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='last_name'
              render={({ field }) => (
                <FormItem className='w-full'>
                  <FormControl>
                    <Input placeholder={profile?.last_name} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
        <div className='px-6'><Separator /></div>
        <div className='grid md:grid-cols-2 gap-4 p-6'>
          <div>
            <h3 className='font-semibold text-lg'>Correo electrónico</h3>
            <p className='font-normal leading-snug text-muted-foreground'>Podrá iniciar sesión con este correo y recibir notificaciones importantes.</p>
          </div>
          <div className='flex gap-2'>
            <FormField
              control={form.control}
              name='email'
              render={({ field }) => (
                <FormItem className='w-full'>
                  <FormControl>
                    <Input placeholder={profile?.email} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
        <div className='px-6'><Separator /></div>
        <div className='grid md:grid-cols-2 gap-4 p-6'>
          <div>
            <h3 className='font-semibold text-lg'>Imagen de perfil</h3>
            <p className='font-normal leading-snug text-muted-foreground'>Opcionalmente, puede añadir una imagen de perfil</p>
          </div>
          <div className='flex gap-2'>
            <FormField
              control={form.control}
              name="avatar"
              render={({ field: { value, onChange, ...fieldProps } }) => (
                <FormItem>
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
          </div>
        </div>
        <div className='px-6'><Separator /></div>
        <div className='grid md:grid-cols-2 gap-4 p-6'>
          <div>
            <h3 className='font-semibold text-lg'>Género</h3>
          </div>
          <div className='flex gap-2'>
            <FormField
              control={form.control}
              name="gender"
              render={({ field }) => (
                <FormItem className="space-y-2">
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
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
        <div className='px-6'><Separator /></div>
        <div className='grid md:grid-cols-2 gap-4 p-6'>
          <div>
            <h3 className='font-semibold text-lg'>Fecha de nacimiento</h3>
          </div>
          <div className='flex gap-2'>
            <FormField
              control={form.control}
              name='birthdate'
              render={({ field }) => (
                <FormItem className='w-full'>
                  <FormControl>
                    <Input placeholder={profile?.birthdate} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
        <div className='px-6'><Separator /></div>
        <div className='grid md:grid-cols-2 gap-4 p-6'>
          <h3 className='font-semibold text-lg'>Número de contacto</h3>
          <div className='flex gap-2'>
            <FormField
              control={form.control}
              name='phone'
              render={({ field }) => (
                <FormItem className='w-full'>
                  <FormControl>
                    <Input placeholder={profile?.phone ?? 'Opcional'} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
      </Form>
    </>
  )
}
