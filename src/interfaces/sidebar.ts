import { type IconType } from 'react-icons/lib'

export interface MenuItem {
  title: string
  link: string
  Icon: IconType
}

export interface MenuSection {
  title?: string
  items: MenuItem[]
}
