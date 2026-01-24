import { Head, Link, usePage } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import { users } from '@/routes';
import { create } from '@/routes/users';
import type { BreadcrumbItem, User } from '@/types';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Usuarios',
        href: users().url,
    },
];

export default function Users() {
    const { users } = usePage<{
        users: User[];
    }>().props;

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Usuarios" />

            <div className="p-4">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-xl">Usuarios</h1>
                        <p className="text-sm text-muted-foreground">
                            Administra los usuarios de tu cuenta
                        </p>
                    </div>
                    <Button asChild>
                        <Link href={create()}>Crear usuario</Link>
                    </Button>
                </div>
                <pre>{JSON.stringify(users, null, 2)}</pre>
            </div>
        </AppLayout>
    );
}
