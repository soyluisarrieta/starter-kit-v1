import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface AuthStore {
  user?: null | UserAuth
  isAuth: boolean
  setUser: (user: UserAuth) => void
  logout: () => void
}

export const useAuthStore = create<AuthStore>()(
  persist((set) => ({
    user: null,
    isAuth: false,
    setUser: (user) => { set(() => ({ user, isAuth: true })) },
    logout: () => { set(() => ({ user: null, isAuth: false })) }
  }), { name: 'user' })
)

export const useSessionVerified = create((set) => ({
  sessionVerified: false,
  setSessionVerified: (isSessionVerified: boolean) => {
    set(() => ({ sessionVerified: isSessionVerified }))
  }
}))
