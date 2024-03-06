import nProgress from 'nprogress'
import { csrfService, logoutService, profileService, registerService } from '@/services/authService'
import { useAuthStore } from '@/store/AuthStore'
import { toast } from 'sonner'
import { MESSAGE } from '@/constants'

interface AuthHook {
  isAuth: boolean
  profile: null | ProfileAuth
  getProfile: () => Promise<void>
  register: (userData: RegisterForm) => void
  logout: () => void
}

export function useAuth (): AuthHook {
  const { profile, setProfile } = useAuthStore()

  // Fn: Get user data from API
  const getProfile = async (): Promise<void> => {
    try {
      const userData = await profileService()
      setProfile(userData)
    } catch (err) {
      console.warn(err)
      setProfile(null)
    }
  }

  // Fn: Send register user data to API
  const register = async (userData: RegisterForm): Promise<void> => {
    nProgress.start()
    try {
      await csrfService()
      await registerService(userData)
      await getProfile()
      toast(MESSAGE.WELCOME, { position: 'top-right', duration: 5000 })
    } catch (err) {
      console.warn(err)
    } finally {
      nProgress.done()
    }
  }

  // Fn: Finish user session
  const logout = async (): Promise<void> => {
    nProgress.start()
    try {
      await logoutService()
      setProfile(null)
      toast.success(MESSAGE.LOGOUT, { position: 'top-right' })
    } catch (err) {
      console.warn(err)
    } finally {
      nProgress.done()
    }
  }

  return {
    isAuth: !(typeof profile === 'object'),
    profile,
    register,
    logout,
    getProfile
  }
}
