import { useEffect } from 'react';
import { toast } from 'sonner';

export function useFlashMessages() {
    useEffect(() => {
        const handler = (e: CustomEvent) => {
            const flash = e.detail.flash;
            if (!flash) return;

            if (flash.success) toast.success(flash.success);
            if (flash.error) toast.error(flash.error);
            if (flash.warning) toast.warning(flash.warning);
            if (flash.info) toast.info(flash.info);
        };

        document.addEventListener('inertia:flash', handler);
        return () => document.removeEventListener('inertia:flash', handler);
    }, []);
}
