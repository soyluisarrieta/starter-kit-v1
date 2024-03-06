declare module 'nprogress';

// Components
interface ComponentProps {
  children: React.ReactNode
  className?: string
}

// Auth
interface Credentials {
  email: string
  password: string
}

interface User {
  name: string
  lastname: string
  gender?: 'male' | 'female' | 'other'
}

interface ProfileAuth extends Credentials {
  id: string
}

interface RegisterForm extends User, Credentials {
  passwordConfirmation: string
}

// Colors
type Hexadecimal = `#${string}`
