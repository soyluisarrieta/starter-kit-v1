import Axios, { type AxiosError } from 'axios'
import { toast } from 'sonner'

export interface ErrorProps {
  status: undefined | number
  original: AxiosError
  validation: Record<string, string>
  message: null | string
}

// Axios instance
const axios = Axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL_LOCAL as string,
  headers: { Accept: 'application/json' },
  timeout: 60000,
  withCredentials: true,
  withXSRFToken: true
})

// Error handler usign axios interceptors
axios.interceptors.response.use(null, async (err) => {
  const error: ErrorProps = {
    status: err.response?.status,
    original: err,
    validation: {},
    message: null
  }

  switch (error.status) {
    case 422:
      for (const field in err.response.data.errors) {
        error.validation[field] = err.response.data.errors[field][0]
      }
      break
    case 403:
      error.message = 'No tienes permitido hacer eso.'
      break
    case 401:
      error.message = 'Por favor vuelve a iniciar sesión.'
      break
    case 500:
      error.message = 'Algo salió muy mal. Lo siento.'
      break
    default:
      error.message = 'Algo salió mal. Por favor, inténtelo de nuevo más tarde.'
  }

  toast(error.message)
  return await Promise.reject(error)
})

export default axios
