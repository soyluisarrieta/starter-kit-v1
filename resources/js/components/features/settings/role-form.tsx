import { useForm } from '@inertiajs/react';
import {
    CheckIcon,
    LoaderIcon,
    SaveIcon,
    ShieldCheckIcon,
    Trash2Icon,
} from 'lucide-react';
import { type FormEvent } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import InputError from '@/components/ui/input-error';
import { Label } from '@/components/ui/label';
import { useDialog } from '@/hooks/use-dialog';
import { cn } from '@/lib/utils';
import type { Role } from '@/types';

const PREDEFINED_COLORS = [
    '#acb5c6', // Gray
    '#ef4444', // Red
    '#f97316', // Orange
    '#f59e0b', // Amber
    '#22c55e', // Green
    '#06b6d4', // Cyan
    '#3b82f6', // Blue
    '#6366f1', // Indigo
    '#a855f7', // Purple
    '#ec4899', // Pink
];

interface RoleFormProps {
    role?: Role;
    isLastRole: boolean;
}

export default function RoleForm({ role, isLastRole }: RoleFormProps) {
    const roleDialogForm = useDialog('role-dialog-form');
    const deleteDialog = useDialog('delete-dialog');

    const { post, put, data, setData, errors, processing, isDirty } = useForm({
        label: role?.label ?? '',
        hex_color: role?.hex_color ?? PREDEFINED_COLORS[0],
    });

    // Save user
    const onSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const onSuccess = () => roleDialogForm.onOpenChange(false);

        if (role) {
            put(`/settings/roles/${role.id}`, { onSuccess });
        } else {
            post('/settings/roles', { onSuccess });
        }
    };

    return (
        <form onSubmit={onSubmit} className="space-y-6">
            <div className="grid gap-6">
                <div className="grid gap-2">
                    <div className="flex items-center justify-between">
                        <Label htmlFor="label">Nombre del rol</Label>
                        <Badge
                            className="border-none transition-colors"
                            variant="outline"
                            style={{
                                backgroundColor: data.hex_color + '1A',
                                color: data.hex_color,
                            }}
                        >
                            <ShieldCheckIcon className="size-3.5" />
                            {data.label || 'Vista previa'}
                        </Badge>
                    </div>
                    <Input
                        id="label"
                        name="label"
                        type="text"
                        autoFocus
                        tabIndex={1}
                        value={data.label}
                        onChange={(e) => setData('label', e.target.value)}
                        disabled={processing}
                        placeholder="Ej. Administrador"
                        maxLength={70}
                        required
                    />
                    <InputError message={errors.label} />
                </div>

                <div className="grid gap-3">
                    <Label htmlFor="hex_color">Color del rol</Label>
                    <div className="flex flex-wrap gap-3">
                        {PREDEFINED_COLORS.map((color) => (
                            <button
                                type="button"
                                key={color}
                                onClick={() => setData('hex_color', color)}
                                className={cn(
                                    'group relative flex size-7 items-center justify-center rounded-full border border-transparent hover:scale-105 focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:outline-none',
                                    data.hex_color === color &&
                                        'ring-2 ring-ring ring-offset-2',
                                )}
                                style={{ backgroundColor: color }}
                            >
                                <span className="sr-only">
                                    Elegir color {color}
                                </span>
                                {data.hex_color === color && (
                                    <CheckIcon className="size-4 text-white" />
                                )}
                            </button>
                        ))}

                        <div className="relative">
                            <div
                                className={cn(
                                    'flex size-7 cursor-pointer items-center justify-center rounded-full bg-linear-to-br from-red-500 via-green-500 to-blue-500 hover:scale-105',
                                    !PREDEFINED_COLORS.includes(
                                        data.hex_color,
                                    ) && 'ring-2 ring-ring ring-offset-2',
                                )}
                            >
                                {!PREDEFINED_COLORS.includes(
                                    data.hex_color,
                                ) && (
                                    <CheckIcon className="size-4 text-white drop-shadow-md" />
                                )}
                            </div>
                            <Input
                                id="hex_color"
                                name="hex_color"
                                type="color"
                                value={data.hex_color}
                                onChange={(e) =>
                                    setData('hex_color', e.target.value)
                                }
                                className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
                                title="Color personalizado"
                            />
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex justify-between gap-2">
                {role && deleteDialog && (
                    <Button
                        onClick={() => {
                            roleDialogForm.onOpenChange(false);
                            deleteDialog.onOpenChange(true);
                        }}
                        className="text-foreground hover:bg-destructive/60!"
                        variant="ghost"
                        type="button"
                        disabled={processing || isLastRole}
                        title={
                            isLastRole
                                ? 'No se puede eliminar el último rol'
                                : undefined
                        }
                    >
                        <Trash2Icon />
                        Eliminar
                    </Button>
                )}
                <div className="ml-auto flex gap-2">
                    <Button
                        onClick={() => roleDialogForm.onOpenChange(false)}
                        variant="outline"
                        type="button"
                        disabled={processing}
                    >
                        Cancelar
                    </Button>
                    <Button type="submit" disabled={processing || !isDirty}>
                        {processing ? (
                            <LoaderIcon className="animate-spin" />
                        ) : (
                            <SaveIcon />
                        )}
                        Guardar
                    </Button>
                </div>
            </div>
        </form>
    );
}
