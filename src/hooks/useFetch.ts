import { queryClient } from '@/lib/react-query'
import { handleValidationErrors } from '@/lib/utils/handleValidationErrors'
import { useAuthStore } from '@/store/AuthStore'
import { MutationOptions, QueryKey, QueryOptions, useMutation, useQuery } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { UseFormReturn } from 'react-hook-form'
import { toast } from 'react-toastify'

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
    case 422:
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
  const query =  useQuery({
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
  return query
}

interface ApiMutationOptions<TData, TVariables, TError = ApiError>
  extends Omit<MutationOptions<TData, TError, TVariables>, 'onError' | 'onSuccess'> {
    queryKey: QueryKey
    messages: { success: string, error: string }
    onError?: (error: ApiError) => void
    onSuccess?: (data: TData) => TData
  }

// Mutation
export function useFetchMutation<TData, TVariables> (
  config: ApiMutationOptions<TData, TVariables>,
  form?: UseFormReturn
) {
  const handleError = useErrorHandler()
  const mutation = useMutation({
    ...config,
    onSuccess: (data) => {
      config.onSuccess?.(data)
      const successMssg = config.messages?.success
      successMssg && toast.success(successMssg)
      queryClient.invalidateQueries(config.queryKey)
      return data
    },
    onError: (error) => {
      config.onError?.(error)
      form && handleValidationErrors(error, form.setError)
      handleError(error)
    }
  })
  return mutation
}
