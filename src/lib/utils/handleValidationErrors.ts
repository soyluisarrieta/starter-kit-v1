import { type UseFormSetError } from 'react-hook-form'

type ValidationError = Record<string, string>

export function handleValidationErrors (err: any, setError: UseFormSetError<ValidationError>): void {
  if (err?.validation) {
    const validationErrors: ValidationError = err.validation
    for (const [fieldName, message] of Object.entries(validationErrors)) {
      setError(fieldName, { type: 'custom', message })
    }
  }
}
