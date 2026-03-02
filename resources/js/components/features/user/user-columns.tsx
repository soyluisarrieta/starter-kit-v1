import type { ColumnDef } from '@tanstack/react-table';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { ShieldCheckIcon } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { PATHS } from '@/constants/paths';
import type { UserWithRoles } from '@/types';
import type { Role } from '@/types';

export const userResponsiveColumns = [
    { columnId: 'last_name', minWidth: 1024 },
    { columnId: 'email', minWidth: 1024 },
    { columnId: 'created_at', minWidth: 768 },
    { columnId: 'updated_at', minWidth: 1024 },
];

interface UserColumnsProps {
    onView: (user: UserWithRoles) => void;
    roles: Role[];
}

export function userColumns({
    onView,
    roles,
}: UserColumnsProps): ColumnDef<UserWithRoles>[] {
    return [
        {
            id: 'name',
            header: 'Nombre',
            accessorFn: (row) => row.name,
            cell: ({ row }) => {
                const user = row.original;
                const fullName = `${user.name} ${user.last_name}`;
                const avatarUrl = user.avatar
                    ? `${PATHS.avatars}/${user.avatar}`
                    : '';

                return (
                    <div
                        className="flex cursor-pointer items-center gap-2 hover:underline"
                        onClick={() => onView(user)}
                    >
                        <Avatar className="size-8 overflow-hidden rounded-full">
                            <AvatarImage src={avatarUrl} alt={user.name} />
                            <AvatarFallback className="rounded-lg bg-neutral-200 text-black dark:bg-neutral-700 dark:text-white">
                                {user.name[0]}
                            </AvatarFallback>
                        </Avatar>
                        <div className="flex flex-col">
                            <div>
                                <span className="hidden font-medium lg:inline">
                                    {user.name}
                                </span>
                                <span className="font-medium lg:hidden">
                                    {fullName}
                                </span>
                            </div>
                            <span className="text-xs font-light text-muted-foreground lg:hidden">
                                {user.email}
                            </span>
                        </div>
                    </div>
                );
            },
        },
        {
            accessorKey: 'last_name',
            header: 'Apellido',
            cell: ({ row }) => (
                <div className="font-medium">{row.getValue('last_name')}</div>
            ),
        },
        {
            accessorKey: 'email',
            header: 'Correo electrónico',
            cell: ({ row }) => (
                <div className="text-muted-foreground">
                    {row.getValue('email')}
                </div>
            ),
        },
        {
            id: 'roles',
            accessorFn: ({ roleIds }) =>
                roleIds.map((id) => roles.find((role) => role.id === id)),
            header: 'Roles',
            size: 0,
            cell: ({ row }) => {
                const userRoles = row.getValue<Role[]>('roles');

                return (
                    <div className="flex flex-wrap gap-1">
                        {userRoles.map(({ id, label, hex_color }) => (
                            <Badge
                                key={id}
                                className="border-none"
                                variant="outline"
                                style={{
                                    backgroundColor: hex_color + '1A',
                                    color: hex_color,
                                }}
                            >
                                <ShieldCheckIcon />
                                {label}
                            </Badge>
                        ))}
                    </div>
                );
            },
        },
        {
            accessorKey: 'created_at',
            header: 'Fecha de registro',
            size: 0,
            cell: ({ row }) => {
                const date = row.getValue<string>('created_at');
                return format(new Date(date), 'dd MMM yyyy', {
                    locale: es,
                });
            },
        },
        {
            accessorKey: 'updated_at',
            header: 'Último acceso',
            size: 0,
            cell: ({ row }) => {
                const date = row.getValue<string>('updated_at');
                return format(new Date(date), 'dd MMM yyyy', {
                    locale: es,
                });
            },
        },
    ];
}
