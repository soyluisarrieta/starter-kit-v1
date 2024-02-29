import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import React from 'react'
import { type UseFormRegister, type FieldValues, type DeepMap, type FieldError } from 'react-hook-form'

interface FieldProps {
  id: string
  label: string
  type?: string
  register: UseFormRegister<FieldValues>
  error?: DeepMap<FieldValues, FieldError>
}

const FormField: React.FC<FieldProps> = ({ label, id, type = 'text', register, error }) => (
  <>
    <Label htmlFor={id}>{label}</Label>
    <Input id={id} type={type} {...register(id)} />
    {error && (
      <div role="alert">{error.message?.toString()}</div>
    )}
  </>
)

export default FormField
