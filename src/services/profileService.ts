import axios from '@/lib/axios'

export const csrfService = async (): Promise<void> => {
  await axios.get('/sanctum/csrf-cookie')
}

export const profileService = async (): Promise<UserAuth> => {
  const response = await axios.get('/api/profile')
  return response.data
}

export const logoutService = async (): Promise<void> => {
  await axios.post('/logout')
}

interface LoginProps {
  email: string
  password: string
}

export const loginService = async (credentials: LoginProps): Promise<UserAuth> => {
  return await axios.post('/login', credentials)
}

interface RegisterProps {
  name: string
  lastname: string
  email: string
  password: string
  password_confirmation: string
}

export const registerService = async (userData: RegisterProps): Promise<UserAuth> => {
  return await axios.post('/register', userData)
}
