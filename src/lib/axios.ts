import { FORBIDDEN, INTERNAL_SERVER_ERROR, UNAUTHORIZED, UNPROCESSABLE_ENTITY } from '@/constants'
import Axios, { type AxiosError } from 'axios'

export interface ErrorProps {
  status: undefined | number
  original: AxiosError
  validation: Record<string, string>
  message: null | string
}

// Axios instances
const axios = Axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL_LOCAL as string,
  headers: { Accept: 'application/json' },
  timeout: 60000,
  withCredentials: true,
  withXSRFToken: true
})

// fn: Error handler usign axios private interceptors
const parseAxiosError = (err: AxiosError): ErrorProps => {
  const error: ErrorProps = {
    status: err.response?.status,
    original: err,
    validation: {},
    message: null
  }

  const responseData = err.response?.data as Record<string, any> | null

  const errorMessages = {
    [UNPROCESSABLE_ENTITY]: () => {
      if (responseData?.errors) {
        for (const field in responseData.errors) {
          error.validation[field] = responseData.errors[field][0]
        }
      }
      error.message = responseData?.message
    },
    [FORBIDDEN]: () => {
      error.message = 'No tienes permitido hacer eso.'
    },
    [UNAUTHORIZED]: () => {
      error.message = 'Por favor vuelve a iniciar sesión.'
    },
    [INTERNAL_SERVER_ERROR]: () => {
      error.message = 'Algo salió muy mal. Lo siento.'
    },
    default: () => {
      error.message = 'Algo salió mal. Por favor, inténtelo de nuevo más tarde.'
    }
  };

  (errorMessages[error.status as keyof typeof errorMessages] || errorMessages.default)()

  return error
}

// Request interceptor
axios.interceptors.request.use((config) => {
  const isMultiPart = config.headers['Content-Type'] === 'multipart/form-data'
  if (isMultiPart && (config.method === 'patch' || config.method === 'put')) {
    const method = config.method.toUpperCase()
    config.method = 'post'

    if (config.data instanceof FormData) {
      config.data.append('_method', method)
    } else {
      config.data = { ...config.data, _method: method }
    }
  }
  console.log({ config })

  return config
}, (error) => {
  return Promise.reject(error)
})

// Response interceptor
axios.interceptors.response.use(null, async (err: AxiosError) => {
  const errors = parseAxiosError(err)
  return await Promise.reject(errors)
})

export default axios
