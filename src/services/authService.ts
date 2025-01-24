import axios from '@/lib/axios'

export const csrfService = async (): Promise<void> => {
  await axios.get('/sanctum/csrf-cookie')
}

export const profileService = async (): Promise<ProfileAuth> => {
  const { data: user } = await axios.get('/api/user')
  const fullName = `${user.name} ${user.last_name}`
  const genderLetter = user.gender === 'female' ? 'a' : (user.gender === 'male' ? 'o' : '@')
  return {
    id: user.id,
    name: user.name,
    last_name: user.last_name,
    full_name: fullName,
    birthdate: user.birthdate,
    gender: user.gender,
    gender_letter: genderLetter,
    phone: user.phone,
    address: user.address,
    avatar: user.avatar,
    email: user.email,
    roles: user.roles,
    permissions: user.permissions,
    last_activity: user.last_activity,
    created_at: user.created_at,
    updated_at: user.updated_at,
    active: user.active
  }
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

export const resetPwService = async (data: { token: string, email: string, password: string, password_confirmation: string }): Promise<void> => {
  await axios.post('/reset-password', data)
}
