import { queryClient } from '@/lib/react-query'
import { handleValidationErrors } from '@/lib/utils/handleValidationErrors'
import { createUserService, deleteUserService, getUserService, getUsersService, updateUserService } from '@/services/userService'
import { useMutation, useQuery } from '@tanstack/react-query'
import { UseFormReturn } from 'react-hook-form'
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
export function useCreateUser ({ form }: { form: UseFormReturn }) {
  return useMutation({
    mutationFn: createUserService,
    onSuccess: (data) => {
      toast.success('El usuario ha sido creado con éxito.')
      queryClient.invalidateQueries(['users'])
      return data
    },
    onError: (error) => {
      console.error(error)
      handleValidationErrors(error, form.setError)
    }
  })
}

// Update user by ID
export function useUpdateUser ({ form }: { form: UseFormReturn }) {
  return useMutation({
    mutationFn: updateUserService,
    onSuccess: (data) => {
      toast.success('El usuario ha sido actualizado con éxito.')
      queryClient.invalidateQueries(['users'])
      return data
    },
    onError: (error) => {
      console.error(error)
      handleValidationErrors(error, form.setError)
    }
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
    onError: (error) => {
      console.error(error)
      toast.error('No se pudo eliminar al usuario dado a un error inesperado.')
    }
  })
}
