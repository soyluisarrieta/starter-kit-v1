import yup from '@/lib/yup'

// 🚩 Renombrar constantes
// 🚩 Asignar valicaciones con sus mensajes de error
export const name = yup
  .string()
  .min(3, 'El nombre debe contener al menos 3 caracteres')
  .max(50, 'El nombre no puede exceder de 50 caracteres.')
  .required('El nombre es obligatorio.')

export const last_name = yup
  .string()
  .min(3, 'El apellido debe contener al menos 3 caracteres')
  .max(50, 'El apellido no puede exceder de 50 caracteres.')
  .required('El apellido es obligatorio.')

// 🚩 Remonbrar `Schema`
// 🚩 Añadir las constantes al schema
export const Schema = yup.object({
  name,
  last_name
})
