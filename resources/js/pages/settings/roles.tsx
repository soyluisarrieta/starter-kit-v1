import { Head, usePage } from '@inertiajs/react';
import type { ColumnDef } from '@tanstack/react-table';
import { UserIcon } from 'lucide-react';
import Heading from '@/components/layout/heading';
import { Checkbox } from '@/components/ui/checkbox';
import { DataTable } from '@/components/ui/data-table';
import AppLayout from '@/layouts/app-layout';
import SettingsLayout from '@/layouts/settings/layout';
import type { BreadcrumbItem, Role, SharedData } from '@/types';
import { edit as editRoles } from '@/routes/roles';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Roles y permisos',
        href: editRoles().url,
    },
];

interface PermissionRow {
    id: number;
    key: string;
    label: string;
    roles: Record<string, boolean>;
}

interface PageProps extends SharedData {
    data: PermissionRow[];
    roles: Role[];
}

export default function Roles() {
    const { data, roles } = usePage<PageProps>().props;

    const columns: ColumnDef<PermissionRow>[] = [
        {
            accessorKey: 'label',
            header: 'Permiso',
            minSize: 1000,
        },
        ...roles.map(
            (role): ColumnDef<PermissionRow> => ({
                id: role.id.toString(),
                header: () => (
                    <div
                        className="flex items-center justify-center gap-1 rounded-md px-2 py-1"
                        style={{
                            backgroundColor: `${role.hex_color}1A`,
                            color: role.hex_color,
                        }}
                    >
                        <UserIcon size={14} />
                        <span className="text-xs font-medium">
                            {role.label}
                        </span>
                    </div>
                ),
                accessorFn: (row) => row.roles[role.name],
                enableSorting: false,
                cell: ({ getValue }) => (
                    <div className="flex items-center justify-center">
                        <Checkbox checked={Boolean(getValue())} />
                    </div>
                ),
            }),
        ),
    ];
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Roles y permisos" />

            <h1 className="sr-only">Roles y permisos</h1>

            <SettingsLayout>
                <div className="space-y-6">
                    <Heading
                        variant="small"
                        title="Roles y permisos"
                        description="Configura los roles y permisos del sistema"
                    />
                </div>

                <DataTable
                    data={data}
                    columns={columns}
                    enableExport={false}
                    enableColumnToggle={false}
                    enableRowSelection={false}
                    enablePagination={false}
                    searchableColumns={['label']}
                    searchPlaceholder="Buscar roles..."
                />
            </SettingsLayout>
        </AppLayout>
    );
}
