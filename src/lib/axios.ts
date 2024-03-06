import { FORBIDDEN, INTERNAL_SERVER_ERROR, UNAUTHORIZED, UNPROCESSABLE_ENTITY } from '@/constants'
import Axios, { type AxiosError } from 'axios'
import { toast } from 'sonner'

export interface ErrorProps {
  status: undefined | number
  original: AxiosError
  validation: Record<string, string>
  message: null | string
}

// Axios configurations
const config = {
  baseURL: import.meta.env.VITE_BACKEND_URL_LOCAL as string,
  headers: { Accept: 'application/json' },
  timeout: 60000,
  withCredentials: true
}

// Axios instances
const axiosPrivate = Axios.create({ ...config, withXSRFToken: true })
export const axiosPublic = Axios.create(config)

// fn: Error handler usign axios private interceptors
const parseAxiosError = (err: AxiosError): ErrorProps => {
  const error: ErrorProps = {
    status: err.response?.status,
    original: err,
    validation: {},
    message: null
  }

  const responseData = err.response?.data as Record<string, any> | null

  switch (error.status) {
    case UNPROCESSABLE_ENTITY:
      if (responseData?.errors) {
        for (const field in responseData.errors) {
          error.validation[field] = responseData.errors[field][0]
        }
      }
      break
    case FORBIDDEN:
      error.message = 'No tienes permitido hacer eso.'
      break
    case UNAUTHORIZED:
      error.message = 'Por favor vuelve a iniciar sesión.'
      break
    case INTERNAL_SERVER_ERROR:
      error.message = 'Algo salió muy mal. Lo siento.'
      break
    default:
      error.message = 'Algo salió mal. Por favor, inténtelo de nuevo más tarde.'
  }

  return error
}

// Interceptors
axiosPublic.interceptors.response.use(null, async (err: AxiosError) => {
  const errors = parseAxiosError(err)
  return await Promise.reject(errors)
})

axiosPrivate.interceptors.response.use(null, async (err: AxiosError) => {
  const errors = parseAxiosError(err)
  errors.message?.length && toast.error(errors.message)
  return await Promise.reject(errors)
})

export default axiosPrivate
