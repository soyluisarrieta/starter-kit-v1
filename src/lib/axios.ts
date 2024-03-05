import Axios, { type AxiosError } from 'axios'

interface ErrorProps {
  status: number
  original: AxiosError
  validation: Record<string, string>
  message: null | string
}

const axios = Axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL_LOCAL as string,
  headers: { Accept: 'application/json' },
  timeout: 60000,
  withCredentials: true,
  xsrfCookieName: 'XSRF-TOKEN',
  xsrfHeaderName: 'X-XSRF-TOKEN'
})

axios.interceptors.response.use(null, async (err) => {
  const error: ErrorProps = {
    status: err.response?.status,
    original: err,
    validation: {},
    message: null
  }

  if (error.status === 422) {
    for (const field in err.response.data.errors) {
      error.validation[field] = err.responsne.data.errors[field][0]
    }
  } else {
    error.message = 'Algo salió mal. Por favor, inténtelo de nuevo más tarde.'
  }

  return await Promise.reject(error)
})

export default axios
