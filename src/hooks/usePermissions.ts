import { useAuthStore } from '@/store/AuthStore'
import { usePermissionStore } from '@/store/PermissionsStore'
import { useEffect } from 'react'

export default function usePermissions () {
  const { profile } = useAuthStore()
  const { permissions, setPermissions } = usePermissionStore()

  useEffect(()=>{
    if (profile?.permissions) {
      setPermissions(profile.permissions)
    }
  }, [profile, setPermissions])

  const hasPermission = (permission: string) => profile?.permissions?.includes(permission) ?? false

  return {
    permissions,
    hasPermission
  }
}
