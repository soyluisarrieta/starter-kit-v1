import { create } from 'zustand'

interface PermissionStore {
  permissions: string[]
  setPermissions: (permissions: string[]) => void
}

export const usePermissionStore = create<PermissionStore>()((set) => ({
  permissions: [],
  setPermissions: (permissions) => { set(() => ({ permissions })) }
}))
