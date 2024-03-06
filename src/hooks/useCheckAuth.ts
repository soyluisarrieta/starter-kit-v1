import { axiosPublic } from '@/lib/axios'
import { useAuthStore, useSessionVerified } from '@/store/AuthStore'
import nProgress from 'nprogress'
import { useEffect } from 'react'

export function useCheckAuth (): boolean {
  const { setProfile } = useAuthStore()
  const { sessionVerified, setSessionVerified } = useSessionVerified()

  const checkAuthentication = async (): Promise<void> => {
    nProgress.start()
    try {
      const userData: ProfileAuth = await axiosPublic('/api/user')
      setProfile(userData)
    } catch (err) {
      console.warn(err)
      setProfile(null)
    } finally {
      setSessionVerified(true)
      nProgress.done()
    }
  }

  useEffect(() => {
    setTimeout(() => {
      !sessionVerified && checkAuthentication()
    }, 1000)
  }, [])

  return sessionVerified
}
