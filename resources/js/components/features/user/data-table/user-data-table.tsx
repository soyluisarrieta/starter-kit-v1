import { usePage } from '@inertiajs/react';
import { CopyIcon, EditIcon, EyeIcon, TrashIcon } from 'lucide-react';
import { DataTable } from '@/components/ui/data-table';
import { useDialog } from '@/hooks/use-dialog';
import type { User } from '@/types';
import { userColumns, userResponsiveColumns } from './user-columns';
import { userBulkActions, userFilterConfigs } from './user-configs';

interface UserTableProps {
    selectUser: (user: User) => void;
}

export default function UserTable({ selectUser }: UserTableProps) {
    const { users } = usePage<{ users: User[] }>().props;

    const userDialogForm = useDialog('user-dialog-form');
    const userSheetView = useDialog('user-sheet-view');
    const deleteDialog = useDialog('delete-dialog');

    const handleView = (row: User) => {
        selectUser(row);
        userSheetView.toggle(true);
    };

    const handleDelete = (rows: User[]) => {
        console.log(
            '[Eliminar] Usuarios seleccionados:',
            rows.map((r) => r.id),
        );
    };

    return (
        <DataTable
            data={users}
            columns={userColumns({ onView: handleView })}
            bulkActions={userBulkActions}
            filterConfigs={userFilterConfigs}
            responsiveColumns={userResponsiveColumns}
            exportFilename="usuarios"
            searchPlaceholder="Buscar usuarios..."
            searchableColumns={['name', 'last_name', 'email', 'roles']}
            onDelete={handleDelete}
            rowActions={[
                {
                    label: 'Ver detalles',
                    icon: <EyeIcon className="mr-2 size-4" />,
                    onClick: handleView,
                },
                {
                    label: 'Editar',
                    icon: <EditIcon className="mr-2 size-4" />,
                    onClick: (row) => {
                        userDialogForm.toggle(true);
                        selectUser(row);
                    },
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
                    onClick: (row) => {
                        deleteDialog.toggle(true);
                        selectUser(row);
                    },
                },
            ]}
        />
    );
}
