import { profileService } from '@/services/authService'
import { useAuthStore, useSessionVerified } from '@/store/AuthStore'
import nProgress from 'nprogress'
import { useEffect } from 'react'

export function useCheckAuth (): boolean {
  const { setProfile } = useAuthStore()
  const { sessionVerified, setSessionVerified } = useSessionVerified()

  const checkAuthentication = async (): Promise<void> => {
    nProgress.start()
    try {
      const user = await profileService()
      setProfile(user)
    } catch (err) {
      console.warn(err)
      setProfile(null)
    } finally {
      setSessionVerified(true)
      nProgress.done()
    }
  }

  useEffect(() => {
    !sessionVerified && checkAuthentication()
  }, [])

  return sessionVerified
}
