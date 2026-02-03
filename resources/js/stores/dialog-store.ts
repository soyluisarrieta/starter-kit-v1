import { create } from 'zustand';

export type DialogID = string;

interface DialogStore {
    dialogs: Record<DialogID, boolean>;
    toggleDialog: (id: DialogID, open?: boolean) => void;
    isOpen: (id: DialogID) => boolean;
}

export const useDialogStore = create<DialogStore>((set, get) => ({
    dialogs: {},

    toggleDialog: (id, open) =>
        set((state) => {
            const current = state.dialogs[id] ?? false;
            return { dialogs: { ...state.dialogs, [id]: open ?? !current } };
        }),

    isOpen: (id) => {
        return get().dialogs[id] ?? false;
    },
}));
