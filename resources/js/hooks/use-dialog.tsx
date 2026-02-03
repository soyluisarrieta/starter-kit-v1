import type { DialogID } from '@/stores/dialog-store';
import { useDialogStore } from '@/stores/dialog-store';

export function useDialog(id: DialogID) {
    const open = useDialogStore((state) => state.isOpen(id));
    const toggleDialog = useDialogStore((state) => state.toggleDialog);

    const onOpenChange = (open?: boolean) => toggleDialog(id, open);

    return { open, onOpenChange };
}
