import { useForm } from '@inertiajs/react';
import { LoaderIcon, SaveIcon } from 'lucide-react';
import { type FormEvent } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import InputError from '@/components/ui/input-error';
import { useDialog } from '@/hooks/use-dialog';
import type { Role } from '@/types';

export default function RoleForm({ role }: { role?: Role }) {
    const roleDialogForm = useDialog('role-dialog-form');

    const { post, put, data, setData, errors, processing, isDirty } = useForm({
        label: role?.label ?? '',
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
            <div className="grid gap-2">
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

            <div className="flex justify-end gap-2">
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
        </form>
    );
}
