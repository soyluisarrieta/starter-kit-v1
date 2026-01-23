import { Head } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { users } from '@/routes';
import { create } from '@/routes/users';
import type { BreadcrumbItem } from '@/types';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Usuarios',
        href: users().url,
    },
    {
        title: 'Crear',
        href: create().url,
    },
];

export default function CreateUser() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Crear usuario" />

            <div className="p-4">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-xl">Crear usuario</h1>
                        <p className="text-sm text-muted-foreground">
                            Completa el formulario para crear un nuevo usuario
                        </p>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
