import { Head } from '@inertiajs/react';
import { PlusIcon } from 'lucide-react';
import { useState } from 'react';
import { ConfirmDialog } from '@/components/commons/confirm-dialog';
import UserForm from '@/components/features/user/user-form';
import UserViewSheet from '@/components/features/user/user-view-sheet';
import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { useDialog } from '@/hooks/use-dialog';
import AppLayout from '@/layouts/app-layout';
import { users } from '@/routes';
import { destroy, destroyMultiple } from '@/routes/users';
import type { BreadcrumbItem, User } from '@/types';
import UserDataTable from '@/components/features/user/data-table/user-data-table';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Usuarios',
        href: users().url,
    },
];

export default function Users() {
    const [selectedUsers, setSelectedUsers] = useState<User[]>([]);

    const userDialogForm = useDialog('user-dialog-form');
    const deleteDialog = useDialog('delete-dialog');
    const deleteMultipleDialog = useDialog('delete-multiple-dialog');

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Usuarios" />

            <main className="main-container px-4 py-10">
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
                        className="fixed right-4 bottom-4 size-12 rounded-full p-4 lg:static lg:h-9 lg:w-auto lg:rounded-md"
                        onClick={() => {
                            setSelectedUsers([]);
                            userDialogForm.onOpenChange(true);
                        }}
                    >
                        <PlusIcon className="size-5 lg:size-4" />
                        <span className="hidden lg:inline">Crear usuario</span>
                    </Button>
                </div>

                <UserDataTable setSelectedUsers={setSelectedUsers} />
            </main>

            {/* View user */}
            <UserViewSheet user={selectedUsers[0] ?? null} />

            {/* Create or edit user */}
            <Dialog {...userDialogForm}>
                <DialogContent>
                    <DialogHeader className="mb-2">
                        <DialogTitle>
                            {selectedUsers.length ? 'Editar' : 'Crear'} usuario
                        </DialogTitle>
                        <DialogDescription>
                            {selectedUsers.length
                                ? 'Actualiza la información del usuario.'
                                : 'Completa la información para crear el usuario.'}
                        </DialogDescription>
                    </DialogHeader>
                    <UserForm user={selectedUsers[0] ?? null} />
                </DialogContent>
            </Dialog>

            {/* Delete an user */}
            <ConfirmDialog
                title={`¿Eliminar usuario "${selectedUsers[0]?.name}"?`}
                description="Una vez eliminado el usuario, todos sus datos serán eliminados permanentemente."
                passwordRequired
                method="delete"
                url={selectedUsers[0] ? destroy(selectedUsers[0].id).url : null}
                {...deleteDialog}
            />

            {/* Delete users */}
            <ConfirmDialog
                title={`¿Eliminar ${selectedUsers.length} usuarios seleccionados?`}
                description="Una vez eliminados los usuarios, todos sus datos serán eliminados permanentemente."
                passwordRequired
                method="post"
                url={destroyMultiple().url}
                data={{ ids: selectedUsers.map(({ id }) => id) }}
                {...deleteMultipleDialog}
            />
        </AppLayout>
    );
}
