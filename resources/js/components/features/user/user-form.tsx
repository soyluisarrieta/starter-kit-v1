import { useForm } from '@inertiajs/react';
import { LoaderIcon, SaveIcon } from 'lucide-react';
import { type FormEvent } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import InputError from '@/components/ui/input-error';
import { Label } from '@/components/ui/label';
import { useDialog } from '@/hooks/use-dialog';
import { store, update } from '@/routes/users';
import type { User } from '@/types';

interface UserFormProps {
    user: User | null;
}

export default function UserForm({ user }: UserFormProps) {
    const userDialogForm = useDialog('user-dialog-form');
    const isCreation = !user;

    const { post, put, data, setData, errors, processing, isDirty } = useForm({
        name: user?.name || '',
        last_name: user?.last_name || '',
        email: user?.email || '',
    });

    // Save user
    const onSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (user) {
            put(update(user.id).url);
        } else {
            post(store().url, {
                onSuccess: () => userDialogForm.toggle(false),
            });
        }
    };

    return (
        <form onSubmit={onSubmit} className="space-y-6">
            <div className="grid grid-cols-2 gap-2">
                <div className="grid gap-2">
                    <Label htmlFor="name">Nombre*</Label>
                    <Input
                        id="name"
                        name="name"
                        type="text"
                        autoFocus={isCreation}
                        tabIndex={1}
                        value={data.name}
                        onChange={(e) => setData('name', e.target.value)}
                        disabled={processing}
                        placeholder="Nombre"
                        required
                    />
                    <InputError message={errors.name} />
                </div>

                <div className="grid gap-2">
                    <Label htmlFor="last_name">Apellido*</Label>
                    <Input
                        id="last_name"
                        name="last_name"
                        type="text"
                        tabIndex={2}
                        value={data.last_name}
                        onChange={(e) => setData('last_name', e.target.value)}
                        disabled={processing}
                        placeholder="Apellido"
                        required
                    />
                    <InputError message={errors.last_name} />
                </div>
            </div>

            <div className="grid gap-2">
                <Label htmlFor="email">Correo electrónico*</Label>
                <Input
                    id="email"
                    name="email"
                    type="email"
                    tabIndex={3}
                    value={data.email}
                    onChange={(e) => setData('email', e.target.value)}
                    disabled={processing}
                    placeholder="email@ejemplo.com"
                    required
                />
                <InputError message={errors.email} />
            </div>

            <div className="flex justify-end gap-2">
                <Button
                    onClick={() => userDialogForm.toggle(false)}
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
                    {isCreation ? 'Guardar' : 'Actualizar'}
                </Button>
            </div>
        </form>
    );
}
