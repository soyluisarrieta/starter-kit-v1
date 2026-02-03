import type { ColumnDef } from '@tanstack/react-table';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { PATHS } from '@/constants/paths';
import type { User } from '@/types';
import type { ResponsiveColumnConfig } from '@/types/data-table';

export const userResponsiveColumns: ResponsiveColumnConfig[] = [
    { columnId: 'last_name', minWidth: 1024 },
    { columnId: 'email', minWidth: 1024 },
    { columnId: 'created_at', minWidth: 768 },
    { columnId: 'updated_at', minWidth: 1024 },
];

interface UserColumnsProps {
    onView: (user: User) => void;
}

export function userColumns({ onView }: UserColumnsProps): ColumnDef<User>[] {
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
            accessorKey: 'roles',
            header: 'Roles',
            filterFn: (row, _columnId, filterValue: string[]) => {
                const roles = row.getValue<string[]>('roles');
                return filterValue.some((value) => roles.includes(value));
            },
            cell: ({ row }) => {
                const roles = row.getValue<string[]>('roles');
                return (
                    <div className="flex flex-wrap gap-1">
                        {roles.map((rol) => (
                            <Badge key={rol} variant="outline">
                                {rol}
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
