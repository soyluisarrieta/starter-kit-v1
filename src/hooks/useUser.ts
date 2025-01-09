import { queryClient } from '@/lib/react-query'
import { deleteUserService, getUserService, getUsersService } from '@/services/userService'
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
