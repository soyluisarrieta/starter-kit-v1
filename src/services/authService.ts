import axios from '@/lib/axios'

export const csrfService = async (): Promise<void> => {
  await axios.get('/sanctum/csrf-cookie')
}

export const profileService = async (): Promise<ProfileAuth> => {
  const response = await axios.get('/api/user')
  return response.data
}

export const logoutService = async (): Promise<void> => {
  await axios.post('/logout')
}

export const loginService = async (credentials: Credentials): Promise<ProfileAuth> => {
  return await axios.post('/login', credentials)
}

export const registerService = async (userData: RegisterForm): Promise<ProfileAuth> => {
  return await axios.post('/register', userData)
}

export const forgotPwService = async (email: { email: string }): Promise<void> => {
  await axios.post('/forgot-password', email)
}
