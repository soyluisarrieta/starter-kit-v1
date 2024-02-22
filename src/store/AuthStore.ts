import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface AuthStore {
  user?: UserAuth
  isAuth: boolean
  setUser: (user: UserAuth) => void
  logout: () => void
}

export const useAuthStore = create<AuthStore>()(
  persist((set) => ({
    user: undefined,
    isAuth: false,

    setUser: (user) => {
      set(() => ({
        user,
        isAuth: true
      }))
    },

    logout: () => {
      set(() => ({
        user: undefined,
        isAuth: false
      }))
    }
  }), { name: 'user' })
)
