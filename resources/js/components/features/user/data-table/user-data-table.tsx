import { usePage } from '@inertiajs/react';
import { CopyIcon, EditIcon, EyeIcon, TrashIcon } from 'lucide-react';
import { DataTable } from '@/components/ui/data-table';
import { useDialog } from '@/hooks/use-dialog';
import type { User } from '@/types';
import { userColumns, userResponsiveColumns } from './user-columns';
import { userFilterConfigs } from './user-configs';

interface UserTableProps {
    setSelectedUsers: (user: User[]) => void;
}

export default function UserTable({ setSelectedUsers }: UserTableProps) {
    const { users } = usePage<{ users: User[] }>().props;

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
            columns={userColumns({ onView: handleView })}
            filterConfigs={userFilterConfigs}
            responsiveColumns={userResponsiveColumns}
            exportFilename="usuarios"
            searchPlaceholder="Buscar usuarios..."
            searchableColumns={['name', 'last_name', 'email', 'roles']}
            onDelete={handleDeleteMultiple}
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
