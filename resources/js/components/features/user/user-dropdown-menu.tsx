import {
    CheckIcon,
    EditIcon,
    Link2Icon,
    ShieldIcon,
    TrashIcon,
} from 'lucide-react';
import type { ReactNode } from 'react';
import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface UserDropdownMenuProps {
    children: ReactNode;
}

export default function UserDropdownMenu({ children }: UserDropdownMenuProps) {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>
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
                        <ShieldIcon /> Cambiar rol
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
    );
}
