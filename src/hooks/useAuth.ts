import nProgress from 'nprogress'
import { csrfService, loginService, logoutService, profileService, registerService } from '@/services/authService'
import { useAuthStore } from '@/store/AuthStore'
import { toast } from 'sonner'
import { MESSAGE } from '@/constants'
import { navigate } from 'wouter/use-browser-location'

interface AuthHook {
  isAuth: boolean
  profile: null | ProfileAuth
  getProfile: () => void
  login: (credentials: Credentials) => void
  register: (userData: RegisterForm) => void
  logout: () => void
}

export function useAuth (): AuthHook {
  const { profile, setProfile } = useAuthStore()

  const from = (history.state?.from) !== undefined ? history.state.from : '/'

  // Fn: Get user data from API
  const getProfile = async (): Promise<void> => {
    try {
      const userData = await profileService()
      setProfile(userData)
    } catch (error) {
      console.warn(error)
      setProfile(null)
    }
  }

  // Fn: Send login credentials to API
  const login = async (credentials: Credentials): Promise<void> => {
    nProgress.start()
    try {
      await csrfService()
      await loginService(credentials)
      nProgress.inc(0.4)
      await getProfile()
      navigate(from as string)
      toast(MESSAGE.WELCOME, { position: 'top-right', duration: 5000 })
    } catch (e: any) {
      if (typeof e === 'object' && e !== null && 'response' in e) {
        console.warn(e.response.data)
      } else {
        console.error(e)
        toast.error(MESSAGE.ERROR_TRYCATCH)
      }
    } finally {
      nProgress.done()
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
    } catch (e: any) {
      if (typeof e === 'object' && e !== null && 'response' in e) {
        console.warn(e.response.data)
      } else {
        console.error(e)
        toast.error('Se ha producido un error inesperado. Por favor, inténtelo de nuevo más tarde.')
      }
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
    } catch (e) {
      console.warn(e)
    } finally {
      nProgress.done()
    }
  }

  return {
    isAuth: !(typeof profile === 'object'),
    profile,
    login,
    register,
    logout,
    getProfile
  }
}
