import { create } from 'zustand'

export interface FormHeader { title: string | null , description?: string | null }

interface FormStore {
  formHeader: FormHeader
  isResetedFormStore: boolean
  isFormModified: boolean
  onSubmitExists: boolean
  timestamps: { updatedAt?: string | null, createdAt?: string | null }

  setFormHeader: (formHeader: FormHeader) => void
  onSubmit: ((data: any) => void) | undefined
  setIsFormModified: (isFormModified: boolean) => void
  setOnSubmit: (onSubmit: (data: any) => void) => void
  setTimestamps: (timestamps: { updatedAt?: string | null, createdAt?: string | null }) => void
  setOnResetForm: (onSubmit: () => void) => void
  onResetForm: () => void
  resetStore: () => void
}

export const useFormStore = create<FormStore>(set => ({
  formHeader: { title: null, description: null },
  isResetedFormStore: true,
  isFormModified: false,
  onSubmitExists: false,
  onSubmit: undefined,
  timestamps: { updatedAt: null, createdAt: null },
  onResetForm: () => {},

  setIsFormModified: isFormModified => {
    set({ isFormModified, isResetedFormStore: false })
  },
  setOnSubmit: onSubmit => {
    set({ onSubmit, isResetedFormStore: false, onSubmitExists: true })
  },
  setTimestamps: timestamps => {
    set({ timestamps, isResetedFormStore: false })
  },
  setOnResetForm: onResetForm => {
    set({ onResetForm, isResetedFormStore: false })
  },
  resetStore: () => {
    set({
      formHeader: { title: null, description: null },
      isResetedFormStore: true,
      isFormModified: false,
      onSubmitExists: false,
      onSubmit: undefined,
      timestamps: { updatedAt: null, createdAt: null },
      onResetForm: () => {}
    })
  },
  setFormHeader: (formHeader) => {
    set(({ resetStore }) => {
      resetStore()
      return { formHeader }
    })
  }
}))
