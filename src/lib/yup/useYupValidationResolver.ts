import { useCallback } from 'react'
import { type AnyObjectSchema } from 'yup'

interface ValidationError {
  path: string
  type: string | undefined
  message: string
}

interface ValidationErrors {
  inner: ValidationError[]
}

interface ValidationResult {
  values: any
  errors: Record<string, { type: string, message: string }>
}

export const useYupValidationResolver = (validationSchema: AnyObjectSchema): ((data: any) => Promise<ValidationResult>) =>
  useCallback(
    async (data: any): Promise<ValidationResult> => {
      try {
        const values = await validationSchema.validate(data, {
          abortEarly: false
        })

        return {
          values,
          errors: {}
        }
      } catch (errors: unknown) {
        const yupErrors: ValidationErrors = errors as ValidationErrors
        return {
          values: {},
          errors: yupErrors.inner.reduce(
            (allErrors, currentError) => ({
              ...allErrors,
              [currentError.path]: {
                type: currentError.type ?? 'validation',
                message: currentError.message
              }
            }),
            {}
          )
        }
      }
    },
    [validationSchema]
  )
