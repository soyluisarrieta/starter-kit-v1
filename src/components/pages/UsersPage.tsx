import PageLayout from '@/components/layouts/PageLayout'
import { DataTable } from '@/components/ui/datatable'
import { MockUsers } from '@/mocks/MockUsers'

export default function UsersPage (): JSX.Element {
  return (
    <PageLayout
      title="Usuarios"
      description='Lista de usuarios del sistema'
    >
      <main className='container'>
        <DataTable
          data={MockUsers}
          columns={[
            {
              header: 'ID',
              accessorKey: 'id',
              className: 'w-10',
              align: 'center',
              cell: ({ row }) => <div className="text-xs font-medium text-muted-foreground whitespace-nowrap">PS{row.getValue('id')}</div>
            },
            { header: 'Nombre completo', accessorKey: 'full_name' }
          ]}
          withActionMenu
        />
      </main>
    </PageLayout>
  )
}
