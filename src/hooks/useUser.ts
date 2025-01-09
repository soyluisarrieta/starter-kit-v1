import { queryClient } from '@/lib/react-query'
import { createUserService, deleteUserService, getUserService, getUsersService, updateUserService } from '@/services/userService'
import { useMutation, useQuery } from '@tanstack/react-query'
import { toast } from 'react-toastify'

// Get all user
export function useGetAllUsers () {
  return useQuery({
    queryKey: ['users'],
    queryFn: getUsersService
  })
}

// Find user by ID
export function useGetUserById (id: ProfileAuth['id']) {
  return useQuery({
    queryKey: ['users', id],
    queryFn: async () => await getUserService(id ?? '')
  })
}

// Create user
export function useCreateUser () {
  return useMutation({
    mutationFn: createUserService,
    onSuccess: (data) => {
      toast.success('El usuario ha sido creado con éxito.')
      queryClient.invalidateQueries(['users'])
      return data
    },
    onError: () => toast.error('Error al crear el usuario.')
  })
}

// Update user by ID
export function useUpdateUser () {
  return useMutation({
    mutationFn: updateUserService,
    onSuccess: (data) => {
      toast.success('El usuario ha sido actualizado con éxito.')
      queryClient.invalidateQueries(['users'])
      return data
    },
    onError: () => toast.error('Error al actualizar el usuario.')
  })
}

// Delete user by ID
export function useDeleteUser () {
  return useMutation({
    mutationFn: deleteUserService,
    onSuccess: () => {
      toast.success('El usuario ha sido eliminado con éxito.')
      queryClient.invalidateQueries(['users'])
    },
    onError: () => toast.error('Error al eliminar el usuario.')
  })
}
