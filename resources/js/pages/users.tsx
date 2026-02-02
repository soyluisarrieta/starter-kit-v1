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
import { destroy } from '@/routes/users';
import type { BreadcrumbItem, User } from '@/types';
import UserDataTable from '@/components/features/user/data-table/user-data-table';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Usuarios',
        href: users().url,
    },
];

export default function Users() {
    const [selectedUser, setSelectedUser] = useState<User | null>(null);

    const userDialogForm = useDialog('user-dialog-form');
    const deleteDialog = useDialog('delete-dialog');

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
                            setSelectedUser(null);
                            userDialogForm.toggle(true);
                        }}
                    >
                        <PlusIcon className="size-5 lg:size-4" />
                        <span className="hidden lg:inline">Crear usuario</span>
                    </Button>
                </div>

                <UserDataTable selectUser={setSelectedUser} />
            </main>

            {/* View user */}
            <UserViewSheet user={selectedUser} />

            {/* Create or edit user */}
            <Dialog
                onOpenChange={userDialogForm.toggle}
                open={userDialogForm.isOpen}
            >
                <DialogContent>
                    <DialogHeader className="mb-2">
                        <DialogTitle>
                            {selectedUser ? 'Editar' : 'Crear'} usuario
                        </DialogTitle>
                        <DialogDescription>
                            {selectedUser
                                ? 'Actualiza la información del usuario.'
                                : 'Completa la información para crear el usuario.'}
                        </DialogDescription>
                    </DialogHeader>
                    <UserForm user={selectedUser} />
                </DialogContent>
            </Dialog>

            {/* Delete user */}
            <ConfirmDialog
                title={`¿Eliminar usuario "${selectedUser?.name}"?`}
                description="Una vez eliminado el usuario, todos sus datos serán eliminados permanentemente."
                open={deleteDialog.isOpen}
                onOpenChange={deleteDialog.toggle}
                passwordRequired
                method="delete"
                url={selectedUser && destroy(selectedUser.id).url}
            />
        </AppLayout>
    );
}
