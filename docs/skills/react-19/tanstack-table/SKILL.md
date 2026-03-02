---
name: tanstack-table
description: >
  TanStack Table v8 patterns with dynamic columns and filters.
  Trigger: Data tables with sorting, filtering, pagination.
---

# TanStack Table - Skill

## Column Definitions

```tsx
import type { ColumnDef } from '@tanstack/react-table';

// ✅ Static columns
const columns: ColumnDef<User>[] = [
  {
    accessorKey: 'name',
    header: 'Nombre',
  },
  {
    accessorKey: 'email',
    header: 'Correo electrónico',
  },
];

// ✅ Custom column header but with label (REQUIRED)
{
  accessorKey: 'user',
  header: () => <UserIcon />,
  label: 'User'
}

// ✅ Computed accessor
{
  id: 'fullName',
  accessorFn: (row) => `${row.name} ${row.lastName}`,
  header: 'Nombre completo',
}

// ✅ Custom cell renderer
{
  accessorKey: 'created_at',
  header: 'Fecha de registro',
  size: 0, // as width: auto
  cell: ({ row }) => {
    const date = row.getValue<string>('created_at');
    return format(...); // use date-fns
  },
}
```

## Responsive Columns

```tsx
export const userResponsiveColumns: ResponsiveColumnConfig[] = [
    { columnId: 'last_name', minWidth: 1024 },  // hide in table and mobile
    { columnId: 'email', minWidth: 1024 },
    { columnId: 'created_at', minWidth: 768 }, // hide in mobile
    { columnId: 'updated_at', minWidth: 1024 }, 
];
```

## Datatable full implementation

```tsx
// The setter param is only for load data in open dialog
export default function UserTable({ setSelectedUsers }) {
  // ✅ Get data from controller
  const { users, roles } = usePage().props;

  // ✅ Dialog hooks for open/close modals
  const dialogForm = useDialog('user-dialog-form');
  const sheetView = useDialog('user-sheet-view');
  const deleteDialog = useDialog('delete-dialog');
  const deleteMultipleDialog = useDialog('delete-multiple-dialog');

  // ✅ Handlers for open dialogs
  const handleView = (row) => {
    setSelectedUsers([row]);
    sheetView.onOpenChange(true);
  };

  const handleEdit = (row) => {
    setSelectedUsers([row]);
    dialogForm.onOpenChange(true);
  };

  const handleDelete = (row) => {
    setSelectedUsers([row]);
    deleteDialog.onOpenChange(true);
  };

  const handleDeleteMultiple = (rows) => {
    setSelectedUsers(rows);
    deleteMultipleDialog.onOpenChange(true);
  };

  return (
    <DataTable
      data={users} // (REQUIRED)
      columns={userColumns({ onView: handleView, roles })} // (REQUIRED)
      responsiveColumns={userResponsiveColumns}
      exportFilename="usuarios"
      searchPlaceholder="Buscar usuarios..."
      searchableColumns={['name', 'last_name', 'email']}
      onDelete={handleDeleteMultiple}
      
      // ✅ Custom filters for each column
      filterConfigs={[
        {
          columnId: 'roles',
          label: 'Rol',
          type: 'multiValue',
          options: roles.map(({ id, label }) => ({
            value: id.toString(),
            label,
          })),
        },
        {
          columnId: 'created_at',
          label: 'Fecha Registro',
          type: 'dateRange',
        },
      ]}
      
      // ✅ Actions for each row
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
          onClick: (row) => navigator.clipboard.writeText(row.email),
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
```

## Keywords

tanstack-table, react-table, filters, data-table, columns
