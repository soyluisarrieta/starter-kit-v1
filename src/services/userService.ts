import axios from '@/lib/axios'

export const getUsersService = async (): Promise<ProfileAuth[]> => {
  const { data } = await axios.get('/api/users')
  return data
}

export const getUserService = async (id: string): Promise<ProfileAuth> => {
  const { data } = await axios.get(`/api/users/${id}`)
  return data
}

export const createUserService = async (user: ProfileAuth): Promise<ProfileAuth> => {
  const { data } = await axios.post('/api/users', user)
  return data
}

export const updateUserService = async (user: ProfileAuth): Promise<ProfileAuth> => {
  const { data } = await axios.put(`/api/users/${user.id}`, user,
    { headers: { 'Content-Type': 'multipart/form-data' } })
  return data
}

export const deleteUserService = async (id: string): Promise<void> => {
  await axios.delete(`/api/users/${id}`)
}
