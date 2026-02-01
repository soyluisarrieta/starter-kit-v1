import { MailIcon } from 'lucide-react';
import type { User } from '@/types';
import type {
    ColumnFilterConfig,
    DataTableBulkAction,
} from '@/types/data-table';

export const userFilterConfigs: ColumnFilterConfig[] = [
    {
        columnId: 'roles',
        label: 'Rol',
        type: 'multiValue',
        options: [
            { label: 'Administrador', value: 'Administrador' },
            { label: 'Editor', value: 'Editor' },
            { label: 'Usuario', value: 'Usuario' },
        ],
    },
    {
        columnId: 'created_at',
        label: 'Fecha Registro',
        type: 'dateRange',
    },
];

export const userBulkActions: DataTableBulkAction<User>[] = [
    {
        label: 'Enviar email',
        icon: <MailIcon className="mr-2 size-4" />,
        onClick: (rows) =>
            console.log(
                '[Acción masiva] Enviar email a:',
                rows.map((r) => r.email),
            ),
    },
];
