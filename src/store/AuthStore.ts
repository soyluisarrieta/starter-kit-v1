import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface AuthStore {
  isAuth: boolean
  profile: null | UserAuth
  setProfile: (user: UserAuth) => void
  logout: () => void
}

export const useAuthStore = create<AuthStore>()(
  persist((set) => ({
    profile: null,
    isAuth: false,
    setProfile: (user) => { set(() => ({ user, isAuth: true })) },
    logout: () => { set(() => ({ user: null, isAuth: false })) }
  }), { name: 'user' })
)

interface SessionStore {
  sessionVerified: boolean
  setSessionVerified: (isSessionVerified: boolean) => void
}

export const useSessionVerified = create<SessionStore>((set) => ({
  sessionVerified: false,
  setSessionVerified: (isSessionVerified) => {
    set(() => ({ sessionVerified: isSessionVerified }))
  }
}))
