const API = import.meta.env.VITE_BACKEND_URL_LOCAL

export const IMAGES = {
  AVATARS: API + '/avatar'
}

export const DOC_URL = 'https://paylusestudio.com/'

export const COPYRIGHT = {
  NAME: 'Paylus Estudio',
  URL: 'https://paylusestudio.com/'
}

export const MESSAGE = {
  WELCOME: '¡Bienvenido a tu panel administrativo!',
  LOGOUT: 'Sesión finalizada correctamente',
  ERROR_TRYCATCH: 'Se ha producido un error inesperado. Por favor, inténtelo de nuevo más tarde.'
}

// HTTP status codes
export const UNPROCESSABLE_ENTITY = 422
export const FORBIDDEN = 403
export const UNAUTHORIZED = 401
export const INTERNAL_SERVER_ERROR = 500
