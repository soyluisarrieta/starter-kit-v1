import { Head } from '@inertiajs/react'

import AppearanceTabs from '@/components/appearance-tabs'
import HeadingSmall from '@/components/heading-small'
import { type BreadcrumbItem } from '@/types'

import AppLayout from '@/layouts/app-layout'
import SettingsLayout from '@/layouts/settings/layout'

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Ajustes de apariencia',
    href: '/ajustes/apariencia'
  }
]

export default function Appearance () {
  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Ajustes de apariencia" />

      <SettingsLayout>
        <div className="space-y-6">
          <HeadingSmall title="Ajustes de apariencia" description="Actualice la configuración de apariencia de su cuenta" />
          <AppearanceTabs />
        </div>
      </SettingsLayout>
    </AppLayout>
  )
}
