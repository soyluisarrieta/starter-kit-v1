import { queryClient } from '@/lib/react-query'
import { useMutation } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { useNavigate } from 'react-router'

type ErrorResponse = {
  message: string;
  errors?: Record<string, string[]>;
};

export const useApiMutation = <
  TData = any,
  TVariables = any
>(
    service: (variables: TVariables) => Promise<TData>
  ) => {
  const navigate = useNavigate()

  const handleError = (error: AxiosError<ErrorResponse>) => {
    if (error.response?.status === 401) {
      navigate('/ingresar')
    } else if (error.response?.data?.errors) {
      console.error('Validation Errors:', error.response.data.errors)
    } else {
      console.error('Unknown Error:', error.message)
    }
    throw error
  }

  return useMutation<TData, AxiosError<ErrorResponse>, TVariables>({
    mutationFn: service,
    onSuccess: (data) => {
      queryClient.invalidateQueries(['users'])
      return data
    },
    onError: (error) => {
      handleError(error)
    }
  })
}
