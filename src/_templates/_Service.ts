import axios from '@/lib/axios'

// 🚩 Renombrar `getService` por el nombre correspondiente
// 🚩 Añadir parámetro y desestructurarla (si es necesario)
export const getService = async (): Promise<void> => {
  // 🚩 Establecer el endpoint
  await axios.get('/')
}

// 🚩 Renombrar `postService` por el nombre correspondiente
// 🚩 Crear o asignar tipo al parámetro `data` reemplazando `RegisterForm`
// 🚩 Renombrar propiedad `data` si es necesario
// 🚩 Crear o asignar tipo al parámetro de Promise `data` reemplazando `ProfileAuth`
// 🚩 Añadir propiedades y desestructurarla (si es necesario)
export const postService = async (data: RegisterForm): Promise<ProfileAuth> => {
  // 🚩 Establecer el endpoint
  return await axios.post('/', data)
}
