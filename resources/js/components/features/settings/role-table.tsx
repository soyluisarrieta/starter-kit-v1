import {
    flexRender,
    getCoreRowModel,
    getExpandedRowModel,
    useReactTable,
} from '@tanstack/react-table';
import type { ExpandedState } from '@tanstack/react-table';
import type { ColumnDef } from '@tanstack/react-table';
import type { LucideIcon } from 'lucide-react';
import { ChevronRightIcon } from 'lucide-react';
import { useMemo, useState } from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { cn } from '@/lib/utils';
import type {
    GroupedPermission,
    GroupedPermissionId,
    onChangePermissionProps,
    Permission,
    PermissionId,
    Role,
} from '@/types';

interface BaseRow {
    roleValues: Record<number, boolean>;
}

interface GroupRow extends BaseRow {
    isGroup: true;
    id: GroupedPermissionId;
    title: string;
    icon: LucideIcon;
    subRows: PermissionRow[];
}

interface PermissionRow extends BaseRow {
    isGroup: false;
    id: PermissionId;
    name: string;
    label: string;
    permission: Permission;
}

type RowData = GroupRow | PermissionRow;

interface RoleTableProps {
    permissionGroups: GroupedPermission[];
    roles: Array<Role & { permissionIds: PermissionId[] }>;
    onChangePermission: (data: onChangePermissionProps) => void;
}

export default function RoleTable({
    permissionGroups,
    roles,
    onChangePermission,
}: RoleTableProps) {
    const [expanded, setExpanded] = useState<ExpandedState>({});

    // Data for table
    const data: RowData[] = useMemo(() => {
        const rolePermissionMap: Record<number, Set<number>> = {};

        roles.forEach((role) => {
            rolePermissionMap[role.id] = new Set(role.permissionIds ?? []);
        });

        return permissionGroups.map((group) => ({
            isGroup: true,
            id: group.id,
            title: group.title,
            icon: group.icon,
            roleValues: {},
            subRows: group.permissions.map((permission) => {
                const roleValues: Record<number, boolean> = {};

                roles.forEach((role) => {
                    roleValues[role.id] = rolePermissionMap[role.id].has(
                        permission.id,
                    );
                });

                return {
                    isGroup: false,
                    id: permission.id,
                    name: permission.name,
                    label: permission.label,
                    permission,
                    roleValues,
                };
            }),
        }));
    }, [permissionGroups, roles]);

    // Columns for roles
    const roleColumns: ColumnDef<RowData>[] = roles.map((role) => ({
        id: role.id.toString(),
        header: () => (
            <div className="text-center font-semibold">{role.label}</div>
        ),
        cell: ({ row: { original } }) => {
            const permission = original.isGroup ? null : original.permission;
            if (!permission) return null;
            const value = original.roleValues[role.id];
            return (
                <div className="flex items-center justify-center">
                    <Checkbox
                        checked={value}
                        onCheckedChange={() => {
                            onChangePermission({
                                permission,
                                role,
                                value,
                            });
                        }}
                    />
                </div>
            );
        },
    }));

    // Columns definition
    const columns: ColumnDef<RowData>[] = [
        {
            id: 'actions',
            header: 'Acciones',
            cell: ({ row }) => {
                if (row.original.isGroup) {
                    const Icon = row.original.icon;
                    return (
                        <button
                            onClick={() => row.toggleExpanded()}
                            className="flex w-full cursor-pointer items-center gap-2 px-2 py-4 text-left font-semibold"
                        >
                            <ChevronRightIcon
                                className={cn(
                                    'h-4 w-4 transition-transform',
                                    row.getIsExpanded() && 'rotate-90',
                                )}
                            />
                            <Icon className="h-5 w-5 text-blue-500" />
                            {row.original.title}
                        </button>
                    );
                }

                return (
                    <div className="py-2 pr-4 pl-6">
                        <span className="font-medium">
                            {row.original.label}
                        </span>
                    </div>
                );
            },
        },
        ...roleColumns,
    ];

    // eslint-disable-next-line react-hooks/incompatible-library
    const table = useReactTable({
        data: data,
        columns,
        state: { expanded },
        onExpandedChange: setExpanded,
        getCoreRowModel: getCoreRowModel(),
        getExpandedRowModel: getExpandedRowModel(),
        getSubRows: (row) => (row as GroupRow).subRows,
    });

    return (
        <Table>
            <TableHeader>
                {table.getHeaderGroups().map((headerGroup) => (
                    <TableRow key={headerGroup.id}>
                        {headerGroup.headers.map((header) => (
                            <TableHead
                                key={header.id}
                                className={cn(
                                    'border-b bg-muted/50',
                                    header.id !== 'actions' &&
                                        'w-32 text-center',
                                )}
                            >
                                {header.isPlaceholder
                                    ? null
                                    : flexRender(
                                          header.column.columnDef.header,
                                          header.getContext(),
                                      )}
                            </TableHead>
                        ))}
                    </TableRow>
                ))}
            </TableHeader>

            <TableBody>
                {table.getRowModel().rows.map((row) => {
                    const isGroup = row.original.isGroup;
                    return (
                        <TableRow
                            key={row.id}
                            className={cn(
                                isGroup
                                    ? 'cursor-pointer bg-muted/20 hover:bg-muted/40'
                                    : 'cursor-auto hover:bg-muted/20',
                            )}
                        >
                            {row.getVisibleCells().map((cell) => (
                                <TableCell
                                    key={cell.id}
                                    className={cn('py-3', isGroup && 'p-0')}
                                    colSpan={isGroup ? roles.length + 1 : 1}
                                >
                                    {flexRender(
                                        cell.column.columnDef.cell,
                                        cell.getContext(),
                                    )}
                                </TableCell>
                            ))}
                        </TableRow>
                    );
                })}
            </TableBody>
        </Table>
    );
}
