// Components
interface ComponentProps {
  children: React.ReactNode
  className?: string
}

// Auth
interface UserAuth {
  id: string
  name: string
  lastname: string
  email: string
}

// Colors
type Hexadecimal = `#${string}`
