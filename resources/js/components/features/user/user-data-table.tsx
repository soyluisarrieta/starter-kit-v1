import { usePage } from '@inertiajs/react';
import { CopyIcon, EditIcon, EyeIcon, TrashIcon } from 'lucide-react';
import {
    userColumns,
    userResponsiveColumns,
} from '@/components/features/user/user-columns';
import { DataTable } from '@/components/ui/data-table';
import { useDialog } from '@/hooks/use-dialog';
import type { Role, SharedData, User } from '@/types';

export type UserData = User & { roles: Role['id'][] };

interface UserPageProps extends SharedData {
    users: UserData[];
    readonly roles: Role[];
}

interface UserTableProps {
    setSelectedUsers: (user: User[]) => void;
}

export default function UserTable({ setSelectedUsers }: UserTableProps) {
    const { users, roles } = usePage<UserPageProps>().props;

    const userDialogForm = useDialog('user-dialog-form');
    const userSheetView = useDialog('user-sheet-view');
    const deleteDialog = useDialog('delete-dialog');
    const deleteMultipleDialog = useDialog('delete-multiple-dialog');

    const handleView = (row: User) => {
        setSelectedUsers([row]);
        userSheetView.onOpenChange(true);
    };

    const handleEdit = (row: User) => {
        userDialogForm.onOpenChange(true);
        setSelectedUsers([row]);
    };

    const handleDelete = (row: User) => {
        deleteDialog.onOpenChange(true);
        setSelectedUsers([row]);
    };

    const handleDeleteMultiple = (rows: User[]) => {
        setSelectedUsers(rows);
        deleteMultipleDialog.onOpenChange(true);
    };

    return (
        <DataTable
            data={users}
            columns={userColumns({ onView: handleView, roles })}
            responsiveColumns={userResponsiveColumns}
            exportFilename="usuarios"
            searchPlaceholder="Buscar usuarios..."
            searchableColumns={['name', 'last_name', 'email']}
            onDelete={handleDeleteMultiple}
            filterConfigs={[
                {
                    columnId: 'roles',
                    label: 'Rol',
                    type: 'multiValue',
                    options: roles.map(({ id, label }) => ({
                        value: id.toString(),
                        label: label,
                    })),
                },
                {
                    columnId: 'created_at',
                    label: 'Fecha Registro',
                    type: 'dateRange',
                },
            ]}
            rowActions={[
                {
                    label: 'Ver detalles',
                    icon: <EyeIcon className="mr-2 size-4" />,
                    onClick: handleView,
                },
                {
                    label: 'Editar',
                    icon: <EditIcon className="mr-2 size-4" />,
                    onClick: handleEdit,
                },
                {
                    label: 'Copiar email',
                    icon: <CopyIcon className="mr-2 size-4" />,
                    onClick: (row) => {
                        navigator.clipboard.writeText(row.email);
                    },
                },
                {
                    label: 'Eliminar',
                    icon: <TrashIcon className="mr-2 size-4" />,
                    onClick: handleDelete,
                },
            ]}
        />
    );
}
