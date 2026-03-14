import { usePage } from '@inertiajs/react';
import { toPascalCase } from '@/lib/utils';

type LastPart<T extends string> = T extends `${string}.${infer Rest}`
    ? LastPart<Rest>
    : T;

type CanKey<T extends string> = `can${Capitalize<LastPart<T>>}`;

type CanResultFromArray<T extends readonly string[]> = {
    [K in T[number] as CanKey<K>]: boolean;
};

type CanResultFromRecord<T extends Record<string, string>> = {
    [K in T[keyof T] as CanKey<K>]: boolean;
};

export function useCan<const T extends readonly string[]>(
    permissions: T,
): CanResultFromArray<T>;
export function useCan<const T extends Record<string, string>>(
    permissions: T,
): CanResultFromRecord<T>;
export function useCan(
    permissions: readonly string[] | Record<string, string>,
) {
    const { auth } = usePage().props;
    const userPermissions = new Set(auth.permissions);

    const values = Array.isArray(permissions)
        ? permissions
        : Object.values(permissions);

    return Object.fromEntries(
        values.map((permission: string) => {
            const action = permission.split('.')[1];
            const key = `can${toPascalCase(action)}`;
            return [key, userPermissions.has(permission)];
        }),
    );
}
