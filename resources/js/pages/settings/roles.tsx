import { Head, router, usePage } from '@inertiajs/react';
import { PlusIcon } from 'lucide-react';
import { useMemo } from 'react';
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
import { edit as editRoles } from '@/routes/roles';
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
    const roleDialogForm = useDialog('role-dialog-form');

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
                `/settings/roles/${role.id}`,
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

            <SettingsLayout>
                <div className="mb-6 space-y-6">
                    <Heading
                        variant="small"
                        title="Roles registrados"
                        description="Configura los roles y permisos del sistema"
                    />

                    <Button onClick={() => roleDialogForm.onOpenChange(true)}>
                        <PlusIcon /> Crear rol
                    </Button>
                </div>

                <div className="rounded-lg border border-border bg-card shadow-sm">
                    <RoleTable
                        permissionGroups={permissionGroups}
                        roles={roles}
                        onChangePermission={onChangePermission}
                    />
                </div>
            </SettingsLayout>

            {/* Create or edit role */}
            <Dialog {...roleDialogForm}>
                <DialogContent>
                    <DialogHeader className="mb-2">
                        <DialogTitle>Crear nuevo rol de usuario</DialogTitle>
                        <DialogDescription>
                            Ingresa el nombre para el nuevo rol:
                        </DialogDescription>
                    </DialogHeader>
                    <RoleForm />
                </DialogContent>
            </Dialog>
        </AppLayout>
    );
}
