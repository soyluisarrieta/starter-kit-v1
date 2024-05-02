import { handleValidationErrors } from '@/lib/utils/handleValidationErrors'
import { useYupValidationResolver } from '@/lib/yup/useYupValidationResolver'
import { csrfService } from '@/services/authService'
import nProgress from 'nprogress'
import { type UseFormReturn, type UseFormProps, useForm } from 'react-hook-form'
import { navigate } from 'wouter/use-browser-location'
import { type AnyObjectSchema } from 'yup'
import { useMutation } from 'react-query'
import { toast } from 'react-toastify'
import { useEffect } from 'react'
import { type FormHeader, useFormStore } from '@/store/FormStore'

interface FormHandlerProps {
  formHeader: FormHeader
  withCsrf?: boolean
  schema: AnyObjectSchema
  request: (data: any) => Promise<any>
  onError?: ({ form, error }: { form: UseFormReturn, error: any }) => void
  onFinally?: () => Promise<void>
  successMessage?: string
  redirectTo?: string
  defaultValues?: Record<string, any>
  timestamps?: { updatedAt?: string, createdAt?: string }
  formConfig?: UseFormProps
}

interface FormHandler {
  form: UseFormReturn
  onSubmit: (data: any) => Promise<any>
  response: Record<string, any>
  isLoading: boolean
}

export function useFormHandler ({
  formHeader,
  withCsrf = true,
  schema,
  request,
  onError,
  onFinally,
  successMessage = '',
  redirectTo,
  defaultValues,
  timestamps,
  formConfig
}: FormHandlerProps): FormHandler {
  const {
    isFormModified,
    setIsFormModified,
    setOnSubmit,
    setOnResetForm,
    setTimestamps,
    setFormHeader
  } = useFormStore()

  // Form header
  useEffect(() => { setFormHeader(formHeader) }, [])

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
        toast.success(successMessage)
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

  // Set onSubmit and onReset handlers store
  useEffect(() => {
    setOnSubmit(onSubmit)
    setOnResetForm(() => { form.reset() })
    timestamps && setTimestamps(timestamps)
  }, [])

  // Set store when form is dirty
  useEffect(() => {
    const isFormDirty = form.formState.isDirty
    isFormModified !== isFormDirty && setIsFormModified(isFormDirty)
  }, [form.formState.isDirty])

  return {
    form,
    onSubmit,
    response: mutation.data,
    isLoading: mutation.isLoading
  }
}
