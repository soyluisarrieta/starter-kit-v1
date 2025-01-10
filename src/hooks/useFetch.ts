import { useAuthStore } from '@/store/AuthStore'
import { MutationOptions, QueryOptions, useMutation, useQuery } from '@tanstack/react-query'
import { AxiosError } from 'axios'

interface ErrorResponse {
  message: string
  errors?: Record<string, string[]>
}

type ApiError = AxiosError<ErrorResponse>

// Error handler
const useErrorHandler = () => {
  const { setProfile } = useAuthStore()

  return (error: ApiError): void => {
    const status = error.status
    const errorMessage = error.message

    switch (status) {
    case 401:
      setProfile(null)
      break
    default:
      console.error(`Error ${status}:`, errorMessage)
    }

    // throw error
  }
}

interface ApiQueryOptions<TData, TError = ApiError>
  extends Omit<QueryOptions<TData, TError>, 'onError'> {
  onError?: (error: ApiError) => void
}

// Query
export function useFetchQuery<TData> (config: ApiQueryOptions<TData>) {
  const handleError = useErrorHandler()

  return useQuery({
    ...config,
    onError: (error) => {
      config.onError?.(error)
      handleError(error)
    },
    retry: (failureCount, error) => {
      if (error?.status === 401) {
        return false
      }
      return failureCount < 3
    }
  })
}

interface ApiMutationOptions<TData, TVariables, TError = ApiError>
  extends Omit<MutationOptions<TData, TError, TVariables>, 'onError'> {
  onError?: (error: ApiError) => void
}

// Mutation
export function useFetchMutation<TData, TVariables> (
  config: ApiMutationOptions<TData, TVariables>
) {
  const handleError = useErrorHandler()

  return useMutation({
    ...config,
    onError: (error) => {
      if (error) {
        config.onError?.(error)
        handleError(error)
      }
    }
  })
}
