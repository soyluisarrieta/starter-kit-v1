import { handleValidationErrors } from '@/lib/utils/handleValidationErrors'
import { useYupValidationResolver } from '@/lib/yup/useYupValidationResolver'
import { csrfService } from '@/services/authService'
import nProgress from 'nprogress'
import { useState } from 'react'
import { type UseFormReturn, type UseFormProps, useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { navigate } from 'wouter/use-browser-location'
import { type AnyObjectSchema } from 'yup'

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
  const [isLoading, setIsLoading] = useState(false)
  const [response, setResponse] = useState<any>(null)

  // Form config
  const form = useForm({
    resolver: useYupValidationResolver(schema),
    defaultValues,
    ...formConfig
  })

  // fn: Handle submit
  const onSubmit = form.handleSubmit(async (data: Record<string, any>): Promise<void> => {
    nProgress.start()
    setIsLoading(true)
    try {
      if (withCsrf) { await csrfService() }
      const res = await request(data)
      setResponse(res)
      if (successMessage) {
        toast.success(successMessage, { duration: 5000 })
      }
      if (redirectTo) {
        navigate(redirectTo, { replace: true })
      }
    } catch (error) {
      console.warn(error)
      handleValidationErrors(error, form.setError)
      onError && onError({ form, error })
    } finally {
      nProgress.done()
      setIsLoading(false)
      onFinally && await onFinally()
    }
  })

  return {
    form,
    onSubmit,
    response,
    isLoading
  }
}
