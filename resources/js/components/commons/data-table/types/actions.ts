import type { ComponentType } from 'react';
import type { RowId } from './row';

export interface RowAction<TData> {
    label: string | ((row: TData) => string);
    onClick: (row: TData) => void;
    icon?: ComponentType<{ className?: string }>;
    visible?: boolean | ((row: TData) => boolean);
    variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost';
}

export interface CustomBulkAction {
    label: string;
    icon?: ComponentType<{ className?: string }>;
    variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost';
    onClick: (ids: RowId[]) => void;
}

export interface BulkActionsConfig {
    delete?: ((ids: RowId[]) => void) | false;
    actions?: CustomBulkAction[];
}
