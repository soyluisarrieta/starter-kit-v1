import { usePage } from '@inertiajs/react';
import type { ReactNode } from 'react';
import { Toaster } from 'sonner';
import { SidebarProvider } from '@/components/ui/sidebar';
import { useFlashMessages } from '@/hooks/use-flash-message';
import type { SharedData } from '@/types';

type Props = {
    children: ReactNode;
    variant?: 'header' | 'sidebar';
};

const SonnerToaster = () => <Toaster position="top-right" richColors />;

export function AppShell({ children, variant = 'header' }: Props) {
    const isOpen = usePage<SharedData>().props.sidebarOpen;

    useFlashMessages();

    if (variant === 'header') {
        return (
            <div className="flex min-h-screen w-full flex-col">
                {children}
                <SonnerToaster />
            </div>
        );
    }

    return (
        <SidebarProvider defaultOpen={isOpen}>
            {children}
            <SonnerToaster />
        </SidebarProvider>
    );
}
