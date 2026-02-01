import type { DialogID } from '@/stores/dialog-store';
import { useDialogStore } from '@/stores/dialog-store';

export function useDialog(id: DialogID) {
    const isOpen = useDialogStore((s) => s.isOpen(id));
    const toggleDialog = useDialogStore((s) => s.toggleDialog);

    const toggle = (open?: boolean) => toggleDialog(id, open);

    return {
        isOpen,
        toggle,
    };
}
