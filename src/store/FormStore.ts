import { create } from 'zustand'

interface FormStore {
  isFormModified: boolean
  onSubmitExists: boolean
  timestamps: { updatedAt?: string | null, createdAt?: string | null }
  onSubmit: ((data: any) => void) | undefined
  onReset: () => void
  setIsFormModified: (isFormModified: boolean) => void
  setOnSubmit: (onSubmit: (data: any) => void) => void
  setOnReset: (onSubmit: () => void) => void
  setTimestamps: (timestamps: { updatedAt?: string | null, createdAt?: string | null }) => void
}

export const useFormStore = create<FormStore>((set) => ({
  isFormModified: false,
  onSubmitExists: false,
  timestamps: { updatedAt: null, createdAt: null },
  onSubmit: undefined,
  onReset: () => {},
  setIsFormModified: (isFormModified) => { set({ isFormModified }) },
  setOnSubmit: (onSubmit) => { set({ onSubmit }) },
  setOnReset: (onReset) => { set({ onReset }) },
  setTimestamps: (timestamps) => { set({ timestamps }) }
}))
