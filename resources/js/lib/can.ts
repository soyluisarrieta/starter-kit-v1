/* eslint-disable react-hooks/rules-of-hooks */
import { Auth } from '@/types'
import { usePage } from '@inertiajs/react'

/**
 * Checks if the authenticated user has the specified permission
 * @param permission - Permission string to check
 * @param requireAll - If true, requires all permissions in an array to match (optional)
 * @returns boolean indicating if user has permission
 */
export default function can (permission: string | string[], requireAll: boolean = false): boolean {
  const { auth } = usePage().props as unknown as { auth: Auth }

  if (Array.isArray(permission)) {
    if (requireAll) {
      return permission.every(p => auth.permissions.includes(p))
    }
    return permission.some(p => auth.permissions.includes(p))
  }

  return auth.permissions.includes(permission)
}
