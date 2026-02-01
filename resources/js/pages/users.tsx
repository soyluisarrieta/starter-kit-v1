import { Head, usePage } from '@inertiajs/react';
import { format } from 'date-fns';
import {
    BadgeCheckIcon,
    EditIcon,
    MailIcon,
    PlusIcon,
    MoreVerticalIcon,
    TrashIcon,
    ShieldIcon,
    Link2Icon,
    CheckIcon,
} from 'lucide-react';
import { useCallback, useState } from 'react';
import {
    userColumns,
    userResponsiveColumns,
} from '@/components/features/user/data-table/user-columns';
import {
    userBulkActions,
    userFilterConfigs,
    userRowActions,
} from '@/components/features/user/data-table/user-configs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { DataTable } from '@/components/ui/data-table';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Separator } from '@/components/ui/separator';
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
} from '@/components/ui/sheet';
import { PATHS } from '@/constants/paths';
import AppLayout from '@/layouts/app-layout';
import { cn } from '@/lib/utils';
import { users } from '@/routes';
import type { BreadcrumbItem, User } from '@/types';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Usuarios',
        href: users().url,
    },
];

export default function Users() {
    const [openView, setOpenView] = useState(false);
    const [userView, setUserView] = useState<User | null>(null);
    const { users } = usePage<{ users: User[] }>().props;

    const handleDelete = useCallback((rows: User[]) => {
        console.log(
            '[Eliminar] Usuarios seleccionados:',
            rows.map((r) => r.id),
        );
    }, []);

    const handleView = (row: User) => {
        setUserView(row);
        setOpenView(true);
    };

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
                    <Button className="fixed right-4 bottom-4 size-12 rounded-full p-4 lg:static lg:h-9 lg:w-auto lg:rounded-md">
                        <PlusIcon className="size-5 lg:size-4" />
                        <span className="hidden lg:inline">Nuevo usuario</span>
                    </Button>
                </div>

                <DataTable
                    data={users}
                    columns={userColumns({ onView: handleView })}
                    searchableColumns={['name', 'last_name', 'email', 'roles']}
                    filterConfigs={userFilterConfigs}
                    responsiveColumns={userResponsiveColumns}
                    rowActions={userRowActions}
                    bulkActions={userBulkActions}
                    onDelete={handleDelete}
                    exportFilename="usuarios"
                    searchPlaceholder="Buscar usuarios..."
                />
            </main>

            <Sheet onOpenChange={setOpenView} open={openView}>
                <SheetContent aria-describedby={undefined}>
                    <SheetHeader className="relative">
                        <div
                            className={cn(
                                'absolute inset-0 -z-10 overflow-hidden rounded-b-xl',
                                !userView?.avatar && 'bg-muted',
                            )}
                        >
                            <div
                                className="absolute inset-0 bg-cover bg-center blur-2xl saturate-200"
                                style={{
                                    backgroundImage: `url(${PATHS.avatars}/${userView?.avatar})`,
                                }}
                            />
                        </div>
                        <SheetTitle className="text-shadow-xl relative text-xl font-medium opacity-100 text-shadow-black/10">
                            Detalles
                        </SheetTitle>
                        <Avatar className="mt-4 -mb-10 size-24 rounded-full outline-4 -outline-offset-1 outline-background">
                            <AvatarImage
                                src={`${PATHS.avatars}/${userView?.avatar}`}
                                alt={userView?.name}
                            />
                            <AvatarFallback>{userView?.name[0]}</AvatarFallback>
                        </Avatar>
                        {userView && (
                            <div className="absolute right-4 bottom-3">
                                {userView.roles.map((role) => (
                                    <Badge key={role}>{role}</Badge>
                                ))}
                            </div>
                        )}
                    </SheetHeader>

                    <div className="mt-6 flex flex-1 flex-col gap-y-6 px-4">
                        <div className="flex flex-col justify-center">
                            <div className="flex justify-between gap-3">
                                <h3 className="text-2xl font-medium">
                                    <span>
                                        {userView?.name} {userView?.last_name}
                                    </span>
                                    <small className="ml-1 text-lg text-muted-foreground">
                                        #{userView?.id}
                                    </small>
                                </h3>
                                {userView?.id && (
                                    <div className="space-x-1">
                                        <Button
                                            size="icon-sm"
                                            variant="outline"
                                        >
                                            <EditIcon />
                                        </Button>

                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button
                                                    size="icon-sm"
                                                    variant="outline"
                                                >
                                                    <MoreVerticalIcon />
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end">
                                                <DropdownMenuGroup>
                                                    <Button
                                                        variant="link"
                                                        className="group w-full cursor-default justify-normal text-left font-light hover:no-underline active:bg-accent"
                                                        size="sm"
                                                    >
                                                        <span className="group-focus:hidden">
                                                            <Link2Icon className="text-muted-foreground" />
                                                        </span>
                                                        <span className="hidden group-focus:inline-block">
                                                            <CheckIcon className="text-green-500/80" />
                                                        </span>
                                                        Copiar link
                                                    </Button>
                                                    <DropdownMenuItem>
                                                        <EditIcon /> Editar
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem>
                                                        <ShieldIcon /> Cambiar
                                                        rol
                                                    </DropdownMenuItem>
                                                </DropdownMenuGroup>
                                                <DropdownMenuGroup>
                                                    <DropdownMenuSeparator />
                                                    <DropdownMenuItem className="hover:bg-destructive/70!">
                                                        <TrashIcon /> Eliminar
                                                    </DropdownMenuItem>
                                                </DropdownMenuGroup>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </div>
                                )}
                            </div>
                            <p className="text-sm text-muted-foreground">
                                {userView?.email}
                            </p>
                        </div>

                        <Separator />

                        <div className="space-y-3">
                            <h3 className="text-lg font-medium">
                                Información de contacto
                            </h3>
                            <div className="[&>p]:font-light">
                                <div className="flex items-center gap-1.5 text-muted-foreground">
                                    <MailIcon className="size-3.5" />
                                    <span className="text-sm">
                                        Correo electrónico
                                    </span>
                                </div>
                                <span>{userView?.email}</span>
                                {userView?.email_verified_at && (
                                    <span title="Correo verificado">
                                        <BadgeCheckIcon className="mb-px ml-1 inline size-4 fill-blue-400 text-background" />
                                    </span>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="border-t px-4 py-2 text-xs text-muted-foreground/50">
                        Última actualización:{' '}
                        {userView?.updated_at &&
                            format(
                                new Date(userView.updated_at),
                                'dd/MM/yyyy - HH:mm a',
                            )}
                    </div>
                </SheetContent>
            </Sheet>
        </AppLayout>
    );
}
