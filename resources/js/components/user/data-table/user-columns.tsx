import type { ColumnDef } from '@tanstack/react-table';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { PATHS } from '@/constants/paths';
import type { User } from '@/types';
import type { ResponsiveColumnConfig } from '@/types/data-table';

export const userResponsiveColumns: ResponsiveColumnConfig[] = [
    { columnId: 'created_at', minWidth: 768 },
    { columnId: 'updated_at', minWidth: 1024 },
];

export const userColumns: ColumnDef<User>[] = [
    {
        id: 'name',
        header: 'Nombre',
        accessorFn: (row) => row.name,
        cell: ({ row }) => {
            const user = row.original;
            const avatarUrl = user.avatar
                ? `${PATHS.avatars}/${user.avatar}`
                : '';

            return (
                <div className="flex items-center gap-2">
                    <Avatar className="size-8 overflow-hidden rounded-full">
                        <AvatarImage src={avatarUrl} alt={user.name} />
                        <AvatarFallback className="rounded-lg bg-neutral-200 text-black dark:bg-neutral-700 dark:text-white">
                            {user.name[0]}
                        </AvatarFallback>
                    </Avatar>
                    <span className="font-medium">{user.name}</span>
                </div>
            );
        },
    },
    {
        accessorKey: 'email',
        header: 'Correo electrónico',
        cell: ({ row }) => (
            <div className="text-muted-foreground">{row.getValue('email')}</div>
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
        cell: ({ row }) => {
            const date = row.getValue<string>('updated_at');
            return format(new Date(date), 'dd MMM yyyy', {
                locale: es,
            });
        },
    },
];
