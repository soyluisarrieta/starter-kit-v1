import { format } from 'date-fns';
import {
    BadgeCheckIcon,
    EditIcon,
    MailIcon,
    MoreVerticalIcon,
} from 'lucide-react';
import UserDropdownMenu from '@/components/features/user/user-dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
} from '@/components/ui/sheet';
import { PATHS } from '@/constants/paths';
import { useDialog } from '@/hooks/use-dialog';
import { cn } from '@/lib/utils';
import type { User } from '@/types';

interface UserSheetDetailsProps {
    user: User | null;
}

export default function UserSheetDetails({ user }: UserSheetDetailsProps) {
    const userSheetView = useDialog('user-sheet-view');

    if (!user) return null;

    const avatarUrl = user.avatar
        ? `${PATHS.avatars}/${user.avatar}`
        : undefined;

    return (
        <Sheet {...userSheetView}>
            <SheetContent aria-describedby={undefined}>
                <SheetHeader className="relative">
                    <div
                        className={cn(
                            'absolute inset-0 -z-10 overflow-hidden rounded-b-xl',
                            !user.avatar && 'bg-muted',
                        )}
                    >
                        <div
                            className="absolute inset-0 bg-cover bg-center blur-2xl saturate-200"
                            style={{
                                backgroundImage: `url(${avatarUrl})`,
                            }}
                        />
                    </div>
                    <SheetTitle className="text-shadow-xl relative text-xl font-medium opacity-100 text-shadow-black/10">
                        Detalles
                    </SheetTitle>
                    <Avatar className="mt-4 -mb-10 size-24 rounded-full outline-4 -outline-offset-1 outline-background">
                        <AvatarImage src={avatarUrl} alt={user.name} />
                        <AvatarFallback>{user.name[0]}</AvatarFallback>
                    </Avatar>
                    {user && (
                        <div className="absolute right-4 bottom-3">
                            {user.roles.map((role) => (
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
                                    {user.name} {user.last_name}
                                </span>
                                <small className="ml-1 text-lg text-muted-foreground">
                                    #{user.id}
                                </small>
                            </h3>
                            {user.id && (
                                <div className="space-x-1">
                                    <Button size="icon-sm" variant="outline">
                                        <EditIcon />
                                    </Button>

                                    <UserDropdownMenu>
                                        <Button
                                            size="icon-sm"
                                            variant="outline"
                                        >
                                            <MoreVerticalIcon />
                                        </Button>
                                    </UserDropdownMenu>
                                </div>
                            )}
                        </div>
                        <p className="text-sm text-muted-foreground">
                            {user.email}
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
                            <span>{user.email}</span>
                            {user.email_verified_at && (
                                <span title="Correo verificado">
                                    <BadgeCheckIcon className="mb-px ml-1 inline size-4 fill-blue-400 text-background" />
                                </span>
                            )}
                        </div>
                    </div>
                </div>

                <div className="border-t px-4 py-2 text-xs text-muted-foreground/50">
                    Última actualización:{' '}
                    {user.updated_at &&
                        format(
                            new Date(user.updated_at),
                            'dd/MM/yyyy - HH:mm a',
                        )}
                </div>
            </SheetContent>
        </Sheet>
    );
}
