import { useAuth } from '@/hooks/useAuth'
import { useSessionVerified } from '@/store/AuthStore'
import nProgress from 'nprogress'
import { useEffect } from 'react'

export function useCheckAuth (): boolean {
  const { getProfile } = useAuth()
  const { sessionVerified, setSessionVerified } = useSessionVerified()

  const checkAuthentication = async (): Promise<void> => {
    nProgress.start()
    try {
      getProfile()
    } catch (e) {
      console.warn(e)
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
