import { HiOutlineCog8Tooth, HiOutlineUsers, HiOutlineHome } from 'react-icons/hi2'

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

// File configs
export const MAX_FILE_SIZE = 102400 * 7 // 700KB
export const VALID_FILE_EXT: Record<string, string[]> = { image: ['jpg', 'jpeg', 'png', 'webp'] }
export const ACCEPTED_IMAGES = VALID_FILE_EXT.image.map(ext => `.${ext}`).join(',')

// Sidebar menu items
export const SIDEBAR_ITEMS = [
  {
    title: 'Principales',
    items: [
      { Icon: HiOutlineHome, title: 'Inicio', link: '/' },
      { Icon: HiOutlineUsers, title: 'Usuarios', link: '/usuarios' },
      { Icon: HiOutlineCog8Tooth, title: 'Ajustes', link: '/ajustes' },
      { Icon: HiOutlineHome, title: 'Otra opción', link: '/otro' }
    ]
  },
  {
    title: 'Interno',
    items: [
      { Icon: HiOutlineHome, title: 'Otra opción', link: '/otro' },
      { Icon: HiOutlineHome, title: 'Otra opción', link: '/otro' },
      { Icon: HiOutlineHome, title: 'Otra opción', link: '/otro' },
      { Icon: HiOutlineHome, title: 'Otra opción', link: '/otro' }
    ]
  }
]
