import { format } from 'date-fns';
import {
    PencilIcon,
    ShieldCheckIcon,
    TrashIcon,
    VerifiedIcon,
    EyeIcon,
} from 'lucide-react';
import DataTable from '@/components/commons/data-table/data-table';
import { DataTableRowActions } from '@/components/commons/data-table/data-table-row-actions';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { PATHS } from '@/constants/paths';
import { USER_PERMISSIONS } from '@/constants/permissions';
import { useCan } from '@/hooks/use-can';
import { useDialog } from '@/hooks/use-dialog';
import { cn } from '@/lib/utils';
import { useDialogStore } from '@/stores/dialog-store';
import type { Role, UserWithRoles } from '@/types';
import type {
    BulkActionsConfig,
    DataTableInstance,
    RowAction,
} from '@/types/data-table';

interface UserTableProps {
    roles: Role[];
    table: DataTableInstance<UserWithRoles>;
}

export default function UserTable({ roles, table }: UserTableProps) {
    const { canView, canUpdate, canDelete } = useCan(USER_PERMISSIONS);
    const { setTarget } = table;

    const toggleDialog = useDialogStore((s) => s.toggleDialog);
    const openRowDialog = (row: UserWithRoles, dialogId: string) => {
        setTarget(row);
        toggleDialog(dialogId, true);
    };

    const rowActions: RowAction<UserWithRoles>[] = [
        {
            label: 'Ver',
            icon: EyeIcon,
            visible: canView,
            onClick: (row) => openRowDialog(row, 'user-sheet-view'),
        },
        {
            label: 'Editar',
            icon: PencilIcon,
            visible: canUpdate,
            onClick: (row) => openRowDialog(row, 'user-dialog-form'),
        },
        {
            label: 'Eliminar',
            icon: TrashIcon,
            visible: canDelete,
            onClick: (row) => openRowDialog(row, 'delete-dialog'),
            variant: 'destructive',
        },
    ];

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
                        const onView = canView
                            ? () => openRowDialog(row, 'user-sheet-view')
                            : undefined;

                        const avatarUrl = row.avatar
                            ? `${PATHS.avatars}/${row.avatar}`
                            : '';

                        return (
                            <div className="flex items-center gap-2">
                                <Avatar
                                    className={cn(
                                        'size-9 overflow-hidden rounded-full',
                                        canView && 'cursor-pointer',
                                    )}
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
                                        className={cn(
                                            'w-fit text-base',
                                            canView &&
                                                'cursor-pointer hover:underline',
                                        )}
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
                {
                    id: 'actions',
                    className: 'w-0',
                    cell: ({ row }) => (
                        <DataTableRowActions row={row} actions={rowActions} />
                    ),
                },
            ]}
        />
    );
}
