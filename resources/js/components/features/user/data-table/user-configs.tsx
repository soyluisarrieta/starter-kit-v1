import type { ColumnFilterConfig } from '@/types/data-table';

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
