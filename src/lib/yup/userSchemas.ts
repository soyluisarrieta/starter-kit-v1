/* eslint-disable @typescript-eslint/naming-convention */
import { MAX_FILE_SIZE } from '@/constants'
import { isValidFileType } from '@/lib/utils/others'
import yup from '@/lib/yup'

// Validations
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

export const gender = yup
  .string()
  .oneOf(['male', 'female', 'other'], 'El género no se pudo identificar.')
  .required('El género es obligatorio.')

export const address = yup
  .string()
  .min(3, 'La dirección debe contener al menos 3 caracteres')
  .max(100, 'La dirección no puede exceder de 100 caracteres.')

export const phone = yup
  .string()
  .matches(/^[0-9]+$/, 'Número de teléfono no válido')
  .min(10, 'El número de teléfono debe contener al menos 10 dígitos')
  .max(15, 'El número de teléfono no puede exceder de 15 dígitos.')

export const adultBirthdate = yup
  .date()
  .max(
    new Date(
      new Date().getFullYear() - 18,
      new Date().getMonth(),
      new Date().getDate()
    ), 'Debes tener al menos 18 años.'
  )

export const avatar = yup
  .mixed<File>()
  .test('is-valid-avatar-type', 'Tipo de archivo de avatar no válido', (value) => isValidFileType(value?.name.toLowerCase(), 'image'))
  .test('is-valid-size', `El tamaño máximo permitido es ${MAX_FILE_SIZE / 1024} KB`, value => value && value.size <= MAX_FILE_SIZE)

export const birthdate = yup
  .date()
  .max(new Date(), 'La fecha de nacimiento no puede ser en el futuro.')

export const email = yup
  .string()
  .email('Correo electrónico inválido.')
  .max(100, 'El correo electrónico no puede exceder de 100 caracteres.')
  .required('El correo electrónico es obligatorio.')
  .matches(
    /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
    'Formato de correo inválido.'
  )

export const password = yup
  .string()
  .min(8, 'La contraseña debe contener al menos 8 caracteres.')
  .max(35, 'La contraseña no puede exceder de 35 caracteres.')
  .required('La contraseña es obligatoria.')
  .matches(/\d/, 'La contraseña debe contener al menos un número')

export const password_confirmation = yup
  .string()
  .oneOf([yup.ref('password'), undefined], 'Las contraseñas no coinciden.')
  .required('La confirmación de la contraseña es obligatoria.')

// Schemas
export const loginSchema = yup.object({
  email,
  password
})

export const registerSchema = yup.object({
  name,
  last_name,
  gender,
  email,
  password,
  password_confirmation
})

export const forgotPwSchema = yup.object({
  email
})

export const resetPwSchema = yup.object({
  password,
  password_confirmation
})

export const profileSchema = yup.object({
  name,
  last_name,
  email,
  gender,
  birthdate,
  address,
  phone,
  avatar
})
