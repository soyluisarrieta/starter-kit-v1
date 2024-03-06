import { axiosPublic } from '@/lib/axios'
import { useAuthStore, useSessionVerified } from '@/store/AuthStore'
import { type AxiosResponse } from 'axios'
import nProgress from 'nprogress'
import { useEffect } from 'react'

export function useCheckAuth (): boolean {
  const { setProfile } = useAuthStore()
  const { sessionVerified, setSessionVerified } = useSessionVerified()

  const checkAuthentication = async (): Promise<void> => {
    nProgress.start()
    try {
      const response: AxiosResponse<ProfileAuth> = await axiosPublic('/api/user')
      setProfile(response.data)
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
