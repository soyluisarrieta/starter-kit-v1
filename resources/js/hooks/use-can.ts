import { usePage } from '@inertiajs/react';
import type { PermissionDef, SharedData } from '@/types';

export function useCan<const T extends readonly PermissionDef[]>(
    permissions: T,
) {
    const { auth } = usePage<SharedData>().props;
    const userPermissions = new Set(auth.permissions);

    const result = Object.fromEntries(
        permissions.map((p) => [p.key, userPermissions.has(p.value)]),
    );

    return result as { [K in T[number]['key']]: boolean };
}
