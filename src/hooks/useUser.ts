import { useFetchMutation, useFetchQuery } from '@/hooks/useFetch'
import { createUserService, deleteUserService, getUserService, getUsersService, updateUserService } from '@/services/userService'
import { UseFormReturn } from 'react-hook-form'

// Get all user
export function useGetAllUsers () {
  return useFetchQuery({
    queryKey: ['users'],
    queryFn: getUsersService
  })
}

// Find user by ID
export function useGetUserById (id: ProfileAuth['id']) {
  return useFetchQuery({
    queryKey: ['users', id],
    queryFn: async () => await getUserService(id ?? '')
  })
}

// Create user
export function useCreateUser ({ form }: { form: UseFormReturn }) {
  return useFetchMutation({
    mutationFn: createUserService,
    queryKey: ['users'],
    messages: {
      error: 'Ha ocurrido un error inesperado al crear el usuario.',
      success: 'El usuario ha sido creado con éxito.'
    }
  }, form)
}

// Update user by ID
export function useUpdateUser ({ form }: { form: UseFormReturn }) {
  return useFetchMutation({
    mutationFn: updateUserService,
    queryKey: ['users'],
    messages: {
      success: 'El usuario ha sido actualizado con exito.',
      error: 'Ha ocurrido un error inesperado al actualizar le usuario.'
    }
  }, form)
}

// Delete user by ID
export function useDeleteUser () {
  return useFetchMutation({
    mutationFn: deleteUserService,
    queryKey: ['users'],
    messages: {
      success: 'El usuario ha sido eliminado con exito.',
      error: 'No se pudo eliminar al usuario dado a un error inesperado.'
    }
  })
}
