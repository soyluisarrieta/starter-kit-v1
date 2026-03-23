import type { PageProps } from '@inertiajs/core';
import { Head, router } from '@inertiajs/react';
import { format, formatDistanceToNow } from 'date-fns';
import { es } from 'date-fns/locale';
import { CheckCircleIcon, TrashIcon } from 'lucide-react';
import { ConfirmDialog } from '@/components/commons/confirm-dialog';
import {
    DataTable,
    DataTableRowActions,
    useDataTable,
} from '@/components/commons/data-table';
import type {
    DataTableQuery,
    Paginated,
    RowAction,
} from '@/components/commons/data-table';
import { Badge } from '@/components/ui/badge';
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
} from '@/components/ui/sheet';
import { useDialog } from '@/hooks/use-dialog';
import AppLayout from '@/layouts/app-layout';
import SettingsLayout from '@/layouts/settings/layout';
import { cn } from '@/lib/utils';
import { index as errorsRoute, resolve, destroy } from '@/routes/errors';
import type { BreadcrumbItem } from '@/types';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Errores', href: errorsRoute().url },
];

interface ClientError {
    id: number;
    message: string;
    url: string;
    stack: string;
    component_stack: string | null;
    occurrences: number;
    last_seen_at: string;
    first_seen_at: string;
    resolved_at: string | null;
    reopened_at: string | null;
    user: { id: number; name: string; email: string } | null;
}

interface ErrorsPageProps extends PageProps {
    errors: Paginated<ClientError>;
    queryParams: DataTableQuery;
}

export default function Errors({ errors, queryParams }: ErrorsPageProps) {
    const table = useDataTable<ClientError>({
        route: errorsRoute(),
        queryParams,
        initialData: errors,
    });

    const deleteDialog = useDialog('delete-error-dialog');

    const rowActions: RowAction<ClientError>[] = [
        {
            label: (row) => row.resolved_at ? 'Reabrir' : 'Resolver',
            icon: CheckCircleIcon,
            visible: true,
            onClick: (row) => {
                router.patch(resolve(row.id).url, {}, { preserveScroll: true });
            },
        },
        {
            label: 'Eliminar',
            icon: TrashIcon,
            visible: true,
            variant: 'destructive',
            onClick: (row) => {
                table.setTarget(row);
                deleteDialog.onOpenChange(true);
            },
        },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Errores" />

            <SettingsLayout className="max-w-6xl">
                <DataTable
                    table={table}
                    columns={[
                        {
                            key: 'message',
                            label: 'Error',
                            cell: ({ row }) => (
                                <button
                                    type="button"
                                    className="max-w-xs truncate font-mono text-sm text-left hover:underline cursor-pointer"
                                    onClick={() => table.setTarget(row)}
                                >
                                    {row.message}
                                </button>
                            ),
                        },
                        {
                            key: 'url',
                            label: 'URL',
                            cell: ({ row }) => (
                                <div className="max-w-50 truncate text-sm text-muted-foreground">
                                    {row.url}
                                </div>
                            ),
                        },
                        {
                            id: 'user',
                            label: 'Usuario',
                            fit: true,
                            cell: ({ row }) => (
                                <span className="text-sm">
                                    {row.user?.name ?? 'Guest'}
                                </span>
                            ),
                        },
                        {
                            key: 'occurrences',
                            label: 'Ocurrencias',
                            fit: true,
                            align: 'center',
                        },
                        {
                            key: 'last_seen_at',
                            label: 'Última vez',
                            fit: true,
                            cell: ({ row }) => (
                                <span className="text-sm text-muted-foreground">
                                    {formatDistanceToNow(row.last_seen_at, {
                                        addSuffix: true,
                                        locale: es,
                                    })}
                                </span>
                            ),
                        },
                        {
                            id: 'status',
                            label: 'Estado',
                            fit: true,
                            align: 'center',
                            cell: ({ row }) => <StatusBadge error={row} />,
                        },
                        {
                            id: 'actions',
                            fit: true,
                            hideable: false,
                            sticky: true,
                            cell: ({ row }) => (
                                <DataTableRowActions
                                    row={row}
                                    actions={rowActions}
                                />
                            ),
                        },
                    ]}
                />
            </SettingsLayout>

            <ConfirmDialog
                title={`¿Eliminar error "${table.target?.message}"?`}
                description="El registro de este error será eliminado permanentemente."
                method="delete"
                url={table.target ? destroy(table.target.id).url : null}
                {...deleteDialog}
            />

            <Sheet
                open={!!table.target && !deleteDialog.open}
                onOpenChange={(open) => { if (!open) table.setTarget(null); }}
            >
                <SheetContent side="right" className="sm:max-w-5xl overflow-y-auto">
                    {table.target && (
                        <>
                            <SheetHeader>
                                <SheetTitle className="font-mono text-lg break-all">
                                    {table.target.message}
                                </SheetTitle>
                                <SheetDescription>
                                    <StatusBadge error={table.target} />
                                </SheetDescription>
                            </SheetHeader>

                            <div className="p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
                                <DetailField label="URL" className="md:col-span-2" value={table.target.url} />
                                <DetailField label="Usuario" value={table.target.user?.name ?? 'Guest'} />
                                <DetailField label="Ocurrencias" value={String(table.target.occurrences)} />
                                <DetailField
                                    label="Primera vez"
                                    value={format(table.target.first_seen_at, "dd/MM/yyyy HH:mm:ss", { locale: es })}
                                />
                                <DetailField
                                    label="Última vez"
                                    value={format(table.target.last_seen_at, "dd/MM/yyyy HH:mm:ss", { locale: es })}
                                />
                                {table.target.resolved_at && (
                                    <DetailField
                                        label="Resuelto"
                                        value={format(table.target.resolved_at, "dd/MM/yyyy HH:mm:ss", { locale: es })}
                                    />
                                )}

                                {table.target.stack && (
                                    <div className='md:col-span-full'>
                                        <p className="mb-1 text-xs font-medium text-muted-foreground">Stack trace</p>
                                        <pre className="whitespace-pre-wrap break-all rounded-md bg-muted/50 p-3 font-mono text-xs">
                                            {table.target.stack}
                                        </pre>
                                    </div>
                                )}

                                {table.target.component_stack && (
                                    <div className='md:col-span-full'>
                                        <p className="mb-1 text-xs font-medium text-muted-foreground">Component stack</p>
                                        <pre className="whitespace-pre-wrap break-all rounded-md bg-muted/50 p-3 font-mono text-xs">
                                            {table.target.component_stack}
                                        </pre>
                                    </div>
                                )}
                            </div>
                        </>
                    )}
                </SheetContent>
            </Sheet>
        </AppLayout>
    );
}

function DetailField({ label, value, className }: { label: string; value: string; className?: string }) {
    return (
        <div className={cn('rounded-md bg-muted/30 p-3 ', className)}>
            <p className="text-xs font-medium text-muted-foreground">{label}</p>
            <p className="text-sm break-all">{value}</p>
        </div>
    );
}

function StatusBadge({ error }: { error: ClientError }) {
    if (error.resolved_at) {
        return <Badge variant="outline">Resuelto</Badge>;
    }
    if (error.reopened_at) {
        return <Badge variant="destructive">Reabierto</Badge>;
    }
    return <Badge>Pendiente</Badge>;
}
