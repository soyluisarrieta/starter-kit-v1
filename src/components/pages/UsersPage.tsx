import PageLayout from '@/components/layouts/PageLayout'
import UserForm from '@/components/modules/users/UserForm'
import { DataTable } from '@/components/ui/datatable'
import { MockUsers } from '@/mocks/MockUsers'

export default function UsersPage (): JSX.Element {
  return (
    <PageLayout
      title="Usuarios"
      description='Lista de usuarios del sistema'
      createForm={{
        title: 'Crear usuario',
        description: 'Complete el formulario para crear un nuevo usuario.',
        openButton: { label: 'Crear usuario' },
        component: UserForm
      }}
    >
      <main className='container'>
        <DataTable
          data={MockUsers}
          columns={[
            {
              header: 'ID',
              accessorKey: 'id',
              className: 'w-16',
              align: 'center',
              cell: ({ row }) => <div className="text-xs font-medium text-muted-foreground whitespace-nowrap">PS{row.getValue('id')}</div>
            },
            {
              header: 'Nombre completo',
              accessorKey: 'full_name',
              enableHiding: false
            }
          ]}
          enableActionMenu
        />
      </main>
    </PageLayout>
  )
}
