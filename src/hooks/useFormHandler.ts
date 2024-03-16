import { handleValidationErrors } from '@/lib/utils/handleValidationErrors'
import { useYupValidationResolver } from '@/lib/yup/useYupValidationResolver'
import { csrfService } from '@/services/authService'
import nProgress from 'nprogress'
import { type UseFormReturn, type UseFormProps, useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { navigate } from 'wouter/use-browser-location'
import { type AnyObjectSchema } from 'yup'
import { useMutation } from 'react-query'

interface FormHandlerProps {
  withCsrf?: boolean
  schema: AnyObjectSchema
  request: (data: any) => Promise<any>
  onError?: ({ form, error }: { form: UseFormReturn, error: any }) => void
  onFinally?: () => Promise<void>
  successMessage?: string
  redirectTo?: string
  defaultValues?: Record<string, any>
  formConfig?: UseFormProps
}

interface FormHandler {
  form: UseFormReturn
  onSubmit: (data: any) => Promise<any>
  response: Record<string, any>
  isLoading: boolean
}

export function useFormHandler ({
  withCsrf = true,
  schema,
  request,
  onError,
  onFinally,
  successMessage = '',
  redirectTo,
  defaultValues,
  formConfig
}: FormHandlerProps): FormHandler {
  // Form config
  const form = useForm({
    resolver: useYupValidationResolver(schema),
    defaultValues,
    ...formConfig
  })

  // Use mutation
  const mutation = useMutation(request, {
    // success
    onSuccess: () => {
      if (successMessage) {
        toast.success(successMessage, { duration: 5000 })
      }
      if (redirectTo) {
        navigate(redirectTo, { replace: true })
      }
    },
    // catch
    onError: (error: any) => {
      handleValidationErrors(error, form.setError)
      onError && onError({ form, error })
    },
    // finally
    onSettled: async () => {
      nProgress.done()
      onFinally && await onFinally()
    }
  })

  // fn: Handle submit
  const onSubmit = form.handleSubmit(async (data: Record<string, any>): Promise<void> => {
    nProgress.start()
    if (withCsrf) { await csrfService() }
    mutation.mutate(data)
  })

  return {
    form,
    onSubmit,
    response: mutation.data,
    isLoading: mutation.isLoading
  }
}
