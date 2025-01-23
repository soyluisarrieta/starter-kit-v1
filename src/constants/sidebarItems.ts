import { HiOutlineCog8Tooth, HiOutlineUsers, HiOutlineHome } from 'react-icons/hi2'

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
