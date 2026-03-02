import { usePage } from '@inertiajs/react';
import { toPascalCase } from '@/lib/utils';

type LastPart<T extends string> = T extends `${string}.${infer Rest}`
    ? LastPart<Rest>
    : T;

type CanKey<T extends string> = `can${Capitalize<LastPart<T>>}`;

export function useCan<const T extends readonly string[]>(permissions: T) {
    const { auth } = usePage().props;
    const userPermissions = new Set(auth.permissions);

    const result = Object.fromEntries(
        permissions.map((permission) => {
            const action = permission.split('.')[1];
            const key = `can${toPascalCase(action)}`;
            return [key, userPermissions.has(permission)];
        }),
    );

    return result as { [K in T[number] as CanKey<K>]: boolean };
}
