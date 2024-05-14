declare module 'nprogress';

// Components
interface ClassNameProp {
  className?: string
}
interface ComponentProps extends ClassNameProp {
  children: React.ReactNode
}

// Auth
interface Credentials {
  email: string
  password: string
}

interface User {
  name: string
  last_name: string
  full_name: string
  birthdate?: string
  gender?: 'male' | 'female' | 'other'
  gender_letter?: 'o' | 'a' | '@'
  phone?: string
  address?: string
  avatar?: string
}

interface ProfileAuth extends User {
  id: string
  email: string
  last_activity?: string
  created_at: string
  updated_at: string
  active: boolean
}

interface RegisterForm extends User, Credentials {
  password_confirmation: string
}

// Colors
type Hexadecimal = `#${string}`
