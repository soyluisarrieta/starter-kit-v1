import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useFormHandler } from '@/hooks/useFormHandler'
import { profileSchema } from '@/lib/yup/userSchemas'

// 🚩 Renombrar el nombre de la interfaz `FormProps`
// 🚩 Renombrar `profile` por la propiedad de los datos
// 🚩 Crear o asignar tipo reemplazandolo por `ProfileAuth`
export interface FormProps {
  profile?: ProfileAuth
  successMessage?: string
}

// 🚩 Renombrar nombre del archivo y función `_Form`
// 🚩 Renombrar parámetro `profile` con la propiedad de los datos
// 🚩 Renombrar el nombre de la interfaz `FormProps`
export default function _Form ({ profile, successMessage }: FormProps) {

  // 🚩 Añadir prodiedades con sus valores por defecto
  const defaultValues = {
    name: profile?.name,
    last_name: profile?.last_name
  }

  // 🚩Eliminar este comentario 👇🏽 después de renombrar la función
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { form } = useFormHandler({
    // 🚩 Crear Schema, importarlo y renombrarlo en `profileSchema`
    schema: profileSchema,
    // 🚩 Renombrar `profile` por la propiedad de los datos
    successMessage: successMessage ?? `Se ha ${profile ? 'actualizado' : 'creado'} con éxito.`,
    defaultValues,

    // Gestión de servicios API
    request: async (formData) => {
      // 🚩 Crear servicio y usarlo, Ejemplo:
      // `await loginService(formData)`
      console.log(formData)
    }
  })

  // 🚩 Renombrar el valor de `name` en FormField
  // 🚩 Añadir el resto de campos necesarios
  return (
    <Form {...form}>
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
    </Form>
  )
}
