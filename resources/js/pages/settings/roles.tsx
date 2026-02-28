import { Head, router, usePage } from '@inertiajs/react';
import { PlusIcon } from 'lucide-react';
import { useMemo, useState } from 'react';
import { ConfirmDialog } from '@/components/commons/confirm-dialog';
import RoleForm from '@/components/features/settings/role-form';
import RoleTable from '@/components/features/settings/role-table';
import Heading from '@/components/layout/heading';
import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { PERMISSION_GROUPS } from '@/constants/permissions';
import { useDialog } from '@/hooks/use-dialog';
import AppLayout from '@/layouts/app-layout';
import SettingsLayout from '@/layouts/settings/layout';
import { destroy, edit as editRoles } from '@/routes/roles';
import type {
    BreadcrumbItem,
    GroupedPermission,
    GroupedPermissionId,
    onChangePermissionProps,
    Permission,
    PermissionId,
    Role,
    SharedData,
} from '@/types';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Roles', href: editRoles().url },
];

type PermissionGroups = Record<GroupedPermissionId, GroupedPermission>;

// Page component
interface PageProps extends SharedData {
    roles: Array<Role & { permissionIds: PermissionId[] }>;
    permissions: Permission[];
}

export default function Roles() {
    const { roles, permissions } = usePage<PageProps>().props;
    const [editingRole, setEditingRole] = useState<Role>();
    const roleDialogForm = useDialog('role-dialog-form');
    const deleteDialog = useDialog('delete-dialog');

    // Group permissions
    const permissionGroups = useMemo(() => {
        const groups: Partial<PermissionGroups> = {};

        for (const permission of permissions) {
            const prefix = permission.name.split('.')[0];
            const key = (
                prefix in PERMISSION_GROUPS ? prefix : 'others'
            ) as GroupedPermissionId;

            if (!groups[key]) {
                const permiGroup = PERMISSION_GROUPS[key];
                groups[key] = {
                    id: key,
                    title: permiGroup.title,
                    icon: permiGroup.icon,
                    permissions: [],
                };
            }
            groups[key]!.permissions.push(permission);
        }

        return Object.values(groups);
    }, [permissions]);

    // Handle permission change
    const onChangePermission = ({
        permission,
        role,
        value,
    }: onChangePermissionProps) => {
        return new Promise<void>((resolve, reject) => {
            router.put(
                `/settings/roles/${role.id}/permissions`,
                {
                    permission: permission.name,
                    enabled: value,
                },
                {
                    preserveScroll: true,
                    onFinish: () => resolve(),
                    onError: () => reject(),
                },
            );
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Roles" />

            <SettingsLayout className="max-w-fit">
                <div className="mb-6 space-y-6">
                    <Heading
                        variant="small"
                        title="Roles registrados"
                        description="Configura los roles y permisos del sistema"
                    />

                    <Button
                        onClick={() => {
                            setEditingRole(undefined);
                            roleDialogForm.onOpenChange(true);
                        }}
                    >
                        <PlusIcon /> Crear rol
                    </Button>
                </div>

                <div className="rounded-lg border border-border bg-card shadow-sm">
                    <RoleTable
                        permissionGroups={permissionGroups}
                        roles={roles}
                        onChangePermission={onChangePermission}
                        onEditRole={(role) => {
                            setEditingRole(role);
                            roleDialogForm.onOpenChange(true);
                        }}
                    />
                </div>
            </SettingsLayout>

            {/* Create or edit role */}
            <Dialog {...roleDialogForm}>
                <DialogContent>
                    <DialogHeader className="mb-2">
                        <DialogTitle>
                            {editingRole
                                ? 'Editar rol de usuario'
                                : 'Crear nuevo rol de usuario'}
                        </DialogTitle>
                        <DialogDescription>
                            {editingRole
                                ? 'Modifica el nombre del rol seleccionado:'
                                : 'Ingresa el nombre para el nuevo rol:'}
                        </DialogDescription>
                    </DialogHeader>
                    <RoleForm
                        role={editingRole}
                        isLastRole={roles.length <= 1}
                    />
                </DialogContent>
            </Dialog>

            {/* Delete role */}
            <ConfirmDialog
                title={`¿Eliminar rol "${editingRole?.label}"?`}
                description="Una vez eliminado el rol, los usuarios perderán los permisos asociados a este rol."
                passwordRequired
                method="delete"
                url={editingRole ? destroy(editingRole.id).url : null}
                {...deleteDialog}
            />
        </AppLayout>
    );
}
