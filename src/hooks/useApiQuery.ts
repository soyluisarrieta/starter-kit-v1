import { useQuery, UseQueryOptions } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { useNavigate } from 'react-router'

type ErrorResponse = {
  message: string;
  errors?: Record<string, string[]>;
};

type UseApiQueryOptions<TData, TError> = {
  queryKey: string[];
  options?: UseQueryOptions<TData, TError>;
  onUnauthorized?: () => void;
};

export const useApiQuery = <TData = any, TError = AxiosError<ErrorResponse>>(
  service: (...args: any[]) => Promise<TData>,
  { queryKey, options, onUnauthorized }: UseApiQueryOptions<TData, TError>
) => {
  const navigate = useNavigate()

  const handleError = (error: AxiosError<ErrorResponse>) => {
    if (error.response?.status === 401) {
      onUnauthorized?.()
      navigate('/ingresar')
    } else if (error.response?.data?.errors) {
      console.error('Validation Errors:', error.response.data.errors)
    } else {
      console.error('Unknown Error:', error.message)
    }
    throw error
  }

  return useQuery<TData, TError>(
    queryKey,
    () => service(),
    {
      onError: (err: TError) => handleError(err as AxiosError<ErrorResponse>),
      ...options
    }
  )
}
