import { format } from 'date-fns';
import { VerifiedIcon } from 'lucide-react';
import DataTable from '@/components/commons/data-table/data-table';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { PATHS } from '@/constants/paths';
import { useDialog } from '@/hooks/use-dialog';
import { users as usersRoute } from '@/routes';
import type { UserWithRoles } from '@/types';
import type {
    ColumnDef,
    PaginatedResponse,
    QueryParams,
} from '@/types/data-table';

interface UserTableProps {
    setSelectedUsers: (user: UserWithRoles[]) => void;
    users: PaginatedResponse<UserWithRoles>;
    queryParams: QueryParams;
}

export default function UserTable({
    setSelectedUsers,
    users,
    queryParams,
}: UserTableProps) {
    const userSheetView = useDialog('user-sheet-view');

    const handleView = (row: UserWithRoles) => {
        setSelectedUsers([row]);
        userSheetView.onOpenChange(true);
    };

    const columns: ColumnDef<UserWithRoles>[] = [
        {
            key: 'id',
            label: 'ID',
            className: 'w-0 pr-0 text-muted-foreground',
            align: 'center',
        },
        {
            key: 'name',
            label: 'Nombre completo',
            cell: ({ row }) => {
                const avatarUrl = row.avatar
                    ? `${PATHS.avatars}/${row.avatar}`
                    : '';
                return (
                    <div className="flex items-center gap-2">
                        <Avatar
                            className="size-9 cursor-pointer overflow-hidden rounded-full"
                            onClick={() => handleView(row)}
                        >
                            <AvatarImage src={avatarUrl} alt={row.name} />
                            <AvatarFallback className="rounded-lg bg-neutral-200 text-black uppercase dark:bg-neutral-700 dark:text-white">
                                {row.name.charAt(0)}
                                {row.last_name.charAt(0)}
                            </AvatarFallback>
                        </Avatar>

                        <div className="flex flex-col">
                            <strong
                                className="w-fit cursor-pointer text-base hover:underline"
                                onClick={() => handleView(row)}
                            >
                                {row.name} {row.last_name}
                            </strong>
                            <small className="flex items-center gap-1 text-sm text-muted-foreground">
                                {row.email}
                                {row.email_verified_at && (
                                    <div title="Correo electrónico verificado">
                                        <VerifiedIcon className="size-3.5 text-primary/50" />
                                    </div>
                                )}
                            </small>
                        </div>
                    </div>
                );
            },
        },
        {
            key: 'created_at',
            label: 'Creado',
            className: 'w-0',
            align: 'center',
            cell: ({ row }) => (
                <div className="text-sm">
                    {format(row.created_at, 'MMM d, yyyy')}
                    <br />
                    <time className="text-xs text-muted-foreground">
                        {format(row.created_at, 'hh:mm a')}
                    </time>
                </div>
            ),
        },
        {
            key: 'updated_at',
            label: 'Actualizado',
            className: 'w-0',
            align: 'center',
            cell: ({ row }) => (
                <div className="text-sm">
                    {format(row.updated_at, 'MMM d, yyyy')}
                    <br />
                    <time className="text-xs text-muted-foreground">
                        {format(row.updated_at, 'hh:mm a')}
                    </time>
                </div>
            ),
        },
    ];

    return (
        <DataTable
            columns={columns}
            data={users.data}
            links={users.links}
            route={usersRoute()}
            queryParams={queryParams}
            options={{
                search: { placeholder: 'Buscar usuarios...' },
            }}
        />
    );
}
