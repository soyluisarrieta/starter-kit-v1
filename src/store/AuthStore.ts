import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface AuthStore {
  isAuth: boolean
  profile: null | ProfileAuth
  setProfile: (profile: null | ProfileAuth) => void
  logout: () => void
}

export const useAuthStore = create<AuthStore>()(
  persist((set) => ({
    profile: null,
    isAuth: false,
    setProfile: (profile) => { set(() => ({ profile, isAuth: true })) },
    logout: () => { set(() => ({ profile: null, isAuth: false })) }
  }), { name: 'profile' })
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
