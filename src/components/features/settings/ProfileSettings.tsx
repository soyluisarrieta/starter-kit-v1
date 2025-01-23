import { Button } from '@/components/ui/button'
import DatePicker from '@/components/ui/datepicker'
import ImageUpload from '@/components/ui/image-upload'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Separator } from '@/components/ui/separator'
import { ACCEPTED_IMAGES, GENDERS } from '@/constants'
import { useAuth } from '@/hooks/useAuth'
import { useUpdateUser } from '@/hooks/useUser'
import { profileSchema } from '@/lib/yup/userSchemas'
import { useYupValidationResolver } from '@/lib/yup/useYupValidationResolver'
import moment from 'moment'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { ASSETS } from '@/constants/assets'
import { useAuthStore } from '@/store/AuthStore'

export default function ProfileSettings (): JSX.Element {
  const { profile } = useAuth()
  const { setProfile } = useAuthStore()
  const [genderLetterSelected, setGenderLetterSelected] = useState(profile?.gender_letter ?? GENDERS.other.letter)

  const defaultValues = {
    name: profile?.name ?? '',
    last_name: profile?.last_name ?? '',
    email: profile?.email ?? '',
    gender: profile?.gender ?? undefined,
    birthdate: profile?.birthdate ?? '',
    phone: profile?.phone ?? '',
    avatar: null
  }

  const form = useForm({
    resolver: useYupValidationResolver(profileSchema),
    defaultValues,
    mode: 'onSubmit'
  })

  const isModified = form.formState.isDirty || !form.formState.isValid

  const { mutateAsync: updateUser } = useUpdateUser({ form })

  const onSubmit = async (formData: ProfileAuth) => {
    const updatedProfile = await updateUser({ ...formData, id: profile?.id ?? '' })
    setProfile(updatedProfile)
    form.reset(formData)
  }

  return (
    <Form {...form}>
      <form className='container' onSubmit={form.handleSubmit(onSubmit)}>
        <div className='grid md:grid-cols-2 gap-4 py-4 lg:py-8'>
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
        <Separator />
        <div className='grid md:grid-cols-2 gap-4 py-4 lg:py-8'>
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
                    <DatePicker
                      onChange={field.onChange}
                      value={field.value}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
        <Separator />
        <div className='grid md:grid-cols-2 gap-4 py-4 lg:py-8'>
          <div>
            <h3 className='font-semibold text-lg'>Imagen de perfil</h3>
            <p className='font-normal leading-snug text-muted-foreground'>Opcionalmente, puede añadir una imagen de perfil.</p>
          </div>
          <div className='flex gap-2'>
            <FormField
              control={form.control}
              name="avatar"
              render={({ field: { value, onChange, ...fieldProps } }) => (
                <FormItem>
                  <FormControl>
                    <ImageUpload
                      {...fieldProps}
                      accept={ACCEPTED_IMAGES}
                      image={profile?.avatar ? `${ASSETS.IMAGES.AVATARS}/${profile.avatar}` : ''}
                      onChange={onChange}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
        <Separator />
        <div className='grid md:grid-cols-2 gap-4 py-4 lg:py-8'>
          <div>
            <h3 className='font-semibold text-lg'>Género</h3>
            <p className='font-normal leading-snug text-muted-foreground'>Se usa para identificarl{genderLetterSelected} en la aplicación, ej: Bienvenid{genderLetterSelected}</p>
          </div>
          <div className='flex gap-2'>
            <FormField
              control={form.control}
              name="gender"
              render={({ field }) => (
                <FormItem className="space-y-2">
                  <FormControl>
                    <RadioGroup
                      onValueChange={(genderValue) => {
                        field.onChange(genderValue)
                        setGenderLetterSelected(genderValue === 'male' ? 'o' : genderValue === 'female' ? 'a' : '@')
                      }}
                      defaultValue={field.value}
                      value={field.value}
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
        <Separator />
        <div className='grid md:grid-cols-2 gap-4 py-4 lg:py-8'>
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

        {/* Action buttons */}
        <div className='mt-4 py-4 border-t flex justify-end items-center'>
          <div className='h-10 flex flex-col justify-start gap-1'>
            <span className='text-muted-foreground text-xs -mb-1'>Última actualización:</span>
            <span className='capitalize font-semibold text-sm'>{moment(profile?.updated_at).format('MMM Do YYYY, h:mm A')}</span>
          </div>
          <div className='flex-grow flex justify-end gap-2 lg:items-center'>
            {isModified && (
              <Button
                variant='outline'
                type='button'
                onClick={() => form.reset()}
              >
                  Cancelar
              </Button>
            )}
            <Button
              variant={isModified ? 'default' : 'outline'}
              type='submit'
              disabled={!isModified}
            >
              Guardar cambios
            </Button>
          </div>
        </div>
      </form>
    </Form>
  )
}
