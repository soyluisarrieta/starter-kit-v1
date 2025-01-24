import { type UseFormSetError } from 'react-hook-form'
import { toast } from 'react-toastify'

type ValidationError = Record<string, string>

export function handleValidationErrors (err: any, setError: UseFormSetError<ValidationError>): void {
  if (err?.validation) {
    const validationErrors: ValidationError = err.validation
    for (const [fieldName, message] of Object.entries(validationErrors)) {
      setError(fieldName, { type: 'custom', message })
    }
  } else {
    toast.error('Ha ocurrido un error inesperado en el sistema. Vuela a intentarlo más tarde.')
  }
}
