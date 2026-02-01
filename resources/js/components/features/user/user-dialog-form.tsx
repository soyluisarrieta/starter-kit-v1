import { useForm } from '@inertiajs/react';
import { SaveIcon } from 'lucide-react';
import { useState, type FormEvent } from 'react';
import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import InputError from '@/components/ui/input-error';
import { Label } from '@/components/ui/label';
import { store } from '@/routes/users';

interface UserDialogFormProps {
    children: React.ReactNode;
}

export default function UserDialogForm({ children }: UserDialogFormProps) {
    const [open, setOpen] = useState(false);
    const { post, data, setData, errors, processing, clearErrors, reset } =
        useForm({
            name: '',
            last_name: '',
            email: '',
        });

    // Dialog state
    const onOpenChange = (isOpen: boolean) => {
        setOpen(isOpen);
        if (isOpen) return;
        setTimeout(() => {
            reset();
            clearErrors();
        }, 300);
    };

    // Save user
    const onSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        post(store().url, {
            onSuccess: () => onOpenChange(false),
        });
    };

    return (
        <Dialog onOpenChange={setOpen} open={open}>
            <DialogTrigger asChild>{children}</DialogTrigger>
            <DialogContent>
                <form onSubmit={onSubmit} className="space-y-6">
                    <DialogHeader>
                        <DialogTitle>Crear usuario</DialogTitle>
                        <DialogDescription>
                            Formulario para crear un nuevo usuario.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid grid-cols-2 gap-2">
                        <div className="grid gap-2">
                            <Label htmlFor="name">Nombre*</Label>
                            <Input
                                id="name"
                                name="name"
                                type="text"
                                autoFocus
                                tabIndex={1}
                                value={data.name}
                                onChange={(e) =>
                                    setData('name', e.target.value)
                                }
                                disabled={processing}
                                placeholder="Nombre"
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
                                onChange={(e) =>
                                    setData('last_name', e.target.value)
                                }
                                disabled={processing}
                                placeholder="Apellido"
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
                        />
                        <InputError message={errors.email} />
                    </div>

                    <DialogFooter>
                        <Button
                            onClick={() => onOpenChange(false)}
                            variant="outline"
                            type="button"
                        >
                            Cancelar
                        </Button>
                        <Button type="submit">
                            <SaveIcon /> Guardar
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
