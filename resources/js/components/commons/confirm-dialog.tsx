import { useForm } from '@inertiajs/react';
import { LoaderIcon } from 'lucide-react';
import { type ReactNode } from 'react';
import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogTrigger,
    DialogContent,
    DialogTitle,
    DialogDescription,
    DialogFooter,
    DialogClose,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import InputError from '@/components/ui/input-error';

interface ConfirmDialogProps<TData> {
    open?: boolean;
    onOpenChange?: (open: boolean) => void;
    title: string;
    description?: string;
    passwordRequired?: boolean;
    method: 'post' | 'put' | 'delete';
    url: string | null;
    data?: TData;
    children?: ReactNode;
}

export function ConfirmDialog<TData>({
    open,
    onOpenChange,
    title,
    description,
    passwordRequired,
    method,
    url,
    data: additionalData,
    children,
}: ConfirmDialogProps<TData>) {
    const {
        data,
        setData,
        processing,
        errors,
        reset,
        clearErrors,
        transform,
        [method]: send,
    } = useForm({
        password: '',
    });

    // Submit with password
    const onSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!url) return;
        clearErrors('password');

        if (additionalData) {
            transform((formData) => ({
                ...formData,
                ...additionalData,
            }));
        }

        send(url, {
            preserveScroll: true,
            onSuccess: () => {
                onOpenChange?.(false);
                reset('password');
            },
        });
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            {children && <DialogTrigger asChild>{children}</DialogTrigger>}

            <DialogContent>
                <DialogTitle>{title}</DialogTitle>
                {description && (
                    <DialogDescription>
                        {description}{' '}
                        {passwordRequired &&
                            'Por favor ingresa tu contraseña para confirmar.'}
                    </DialogDescription>
                )}
                <form onSubmit={onSubmit}>
                    {passwordRequired && (
                        <div className="mb-4 grid gap-2">
                            <Input
                                id="password"
                                name="password"
                                type="password"
                                autoFocus
                                tabIndex={1}
                                value={data.password}
                                onChange={(e) => {
                                    setData('password', e.target.value);
                                    clearErrors('password');
                                }}
                                disabled={processing}
                                placeholder="Ingrese su contraseña"
                            />
                            <InputError message={errors.password} />
                        </div>
                    )}
                    <DialogFooter className="gap-2">
                        <DialogClose asChild>
                            <Button variant="secondary" disabled={processing}>
                                Cancelar
                            </Button>
                        </DialogClose>

                        <Button
                            type="submit"
                            variant="destructive"
                            disabled={processing}
                        >
                            {processing && (
                                <LoaderIcon className="animate-spin" />
                            )}
                            {processing ? 'Procesando' : 'Confirmar'}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
