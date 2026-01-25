import { Head, Link, usePage } from '@inertiajs/react';
import type { ColumnDef } from '@tanstack/react-table';
import { PlusIcon } from 'lucide-react';
import { useCallback, useMemo } from 'react';
import { DataTable } from '@/components/data-table';
import { Button } from '@/components/ui/button';
import {
    userColumns,
    userResponsiveColumns,
} from '@/components/user/data-table/user-columns';
import {
    userBulkActions,
    userFilterConfigs,
    userRowActions,
} from '@/components/user/data-table/user-configs';
import AppLayout from '@/layouts/app-layout';
import { users } from '@/routes';
import { create } from '@/routes/users';
import type { BreadcrumbItem, User } from '@/types';
import type {
    ColumnFilterConfig,
    DataTableBulkAction,
    DataTableRowAction,
    ResponsiveColumnConfig,
} from '@/types/data-table';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Usuarios',
        href: users().url,
    },
];

export default function Users() {
    const { users } = usePage<{ users: User[] }>().props;
    const columns: ColumnDef<User, unknown>[] = useMemo(() => userColumns, []);
    const filterConfigs: ColumnFilterConfig[] = useMemo(
        () => userFilterConfigs,
        [],
    );
    const responsiveColumns: ResponsiveColumnConfig[] = useMemo(
        () => userResponsiveColumns,
        [],
    );
    const rowActions: DataTableRowAction<User>[] = useMemo(
        () => userRowActions,
        [],
    );
    const bulkActions: DataTableBulkAction<User>[] = useMemo(
        () => userBulkActions,
        [],
    );

    const handleDelete = useCallback((rows: User[]) => {
        console.log(
            '[Eliminar] Usuarios seleccionados:',
            rows.map((r) => r.id),
        );
    }, []);
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Usuarios" />

            <main className="px-4 py-10">
                <div className="mb-8 flex items-center justify-between">
                    <div className="flex-1">
                        <h1 className="text-3xl font-bold tracking-tight">
                            Gestión de Usuarios
                        </h1>
                        <p className="mt-2 text-muted-foreground">
                            Administra los usuarios del sistema con búsqueda,
                            filtros y exportación.
                        </p>
                    </div>
                    <Button
                        className="fixed right-1 bottom-1 size-12 rounded-full p-4 lg:static lg:h-9 lg:w-auto lg:rounded-md"
                        asChild
                    >
                        <Link href={create()}>
                            <PlusIcon className="size-5 lg:size-4" />
                            <span className="hidden lg:inline">
                                Nuevo usuario
                            </span>
                        </Link>
                    </Button>
                </div>

                <DataTable
                    data={users}
                    columns={columns}
                    searchableColumns={['name', 'email', 'roles']}
                    filterConfigs={filterConfigs}
                    responsiveColumns={responsiveColumns}
                    rowActions={rowActions}
                    bulkActions={bulkActions}
                    onDelete={handleDelete}
                    enableRowSelection
                    enableExport
                    enableColumnToggle
                    pageSizeOptions={[5, 10, 20, 50]}
                    exportFilename="usuarios"
                    searchPlaceholder="Buscar usuarios..."
                />
            </main>
        </AppLayout>
    );
}
