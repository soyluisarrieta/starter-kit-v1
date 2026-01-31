import { Head } from '@inertiajs/react';
import AppearanceTabs from '@/components/layout/appearance-tabs';
import Heading from '@/components/layout/heading';
import AppLayout from '@/layouts/app-layout';
import SettingsLayout from '@/layouts/settings/layout';
import { edit as editAppearance } from '@/routes/appearance';
import type { BreadcrumbItem } from '@/types';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Configuración de apariencia',
        href: editAppearance().url,
    },
];

export default function Appearance() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Configuración de apariencia" />

            <h1 className="sr-only">Configuración de apariencia</h1>

            <SettingsLayout>
                <div className="space-y-6">
                    <Heading
                        variant="small"
                        title="Configuración de apariencia"
                        description="Actualiza la apariencia de tu cuenta"
                    />
                    <AppearanceTabs />
                </div>
            </SettingsLayout>
        </AppLayout>
    );
}
