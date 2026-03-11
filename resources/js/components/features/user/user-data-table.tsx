import { format } from 'date-fns';
import { ShieldCheckIcon, VerifiedIcon } from 'lucide-react';
import DataTable from '@/components/commons/data-table/data-table';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { PATHS } from '@/constants/paths';
import { USER_PERMISSIONS } from '@/constants/permissions';
import { useCan } from '@/hooks/use-can';
import { useDialog } from '@/hooks/use-dialog';
import type { Role, UserWithRoles } from '@/types';
import type { BulkActionsConfig, DataTableInstance } from '@/types/data-table';

interface UserTableProps {
    roles: Role[];
    table: DataTableInstance<UserWithRoles>;
}

export default function UserTable({ roles, table }: UserTableProps) {
    const { canDelete } = useCan([USER_PERMISSIONS.DELETE]);

    const { setTarget } = table;
    const userSheetView = useDialog('user-sheet-view');
    const deleteMultipleDialog = useDialog('delete-multiple-dialog');

    const bulkActions: BulkActionsConfig = {
        delete: canDelete && (() => deleteMultipleDialog.onOpenChange(true)),
        export: {
            columns: [
                { id: 'id', header: 'ID' },
                { id: 'name', header: 'Nombre' },
                { id: 'last_name', header: 'Apellido' },
                { id: 'email', header: 'Email' },
                { id: 'created_at', header: 'Registro' },
            ],
            filename: 'usuarios',
        },
    };

    const actions = {
        view: {
            onClick: (row: UserWithRoles) => {
                setTarget(row);
                userSheetView.onOpenChange(true);
            },
        },
    };

    const rolesMap = new Map(roles.map((role) => [role.id, role]));

    return (
        <DataTable
            table={table}
            bulkActions={bulkActions}
            options={{
                search: { placeholder: 'Buscar usuarios...' },
            }}
            columns={[
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
                        const onView = () => actions.view.onClick(row);
                        const avatarUrl = row.avatar
                            ? `${PATHS.avatars}/${row.avatar}`
                            : '';
                        return (
                            <div className="flex items-center gap-2">
                                <Avatar
                                    className="size-9 cursor-pointer overflow-hidden rounded-full"
                                    onClick={onView}
                                >
                                    <AvatarImage
                                        src={avatarUrl}
                                        alt={row.name}
                                    />
                                    <AvatarFallback className="rounded-lg bg-neutral-200 text-black uppercase dark:bg-neutral-700 dark:text-white">
                                        {row.name.charAt(0)}
                                        {row.last_name.charAt(0)}
                                    </AvatarFallback>
                                </Avatar>

                                <div className="flex flex-col">
                                    <strong
                                        className="w-fit cursor-pointer text-base hover:underline"
                                        onClick={onView}
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
                    key: 'roleIds',
                    label: 'Roles',
                    className: 'w-0',
                    align: 'center',
                    cell: ({ row }) => {
                        const userRoles = row.roleIds
                            .map((id) => rolesMap.get(id))
                            .filter((role): role is Role => Boolean(role));

                        if (!userRoles.length) {
                            return (
                                <small className="text-muted-foreground">
                                    —
                                </small>
                            );
                        }

                        return (
                            <div className="flex flex-wrap gap-1">
                                {userRoles.map(({ id, hex_color, label }) => {
                                    return (
                                        <Badge
                                            key={row.id + id}
                                            className="border-none"
                                            variant="outline"
                                            style={{
                                                backgroundColor:
                                                    hex_color + '1A',
                                                color: hex_color,
                                            }}
                                        >
                                            <ShieldCheckIcon />
                                            {label}
                                        </Badge>
                                    );
                                })}
                            </div>
                        );
                    },
                },
                {
                    key: 'created_at',
                    label: 'Registro',
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
                    label: 'Últ. Actualización',
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
            ]}
        />
    );
}
