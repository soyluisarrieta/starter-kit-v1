import PageLayout from '@/components/layouts/PageLayout'
import List from '@/components/pages/CRUD/List'
import { MockUsers } from '@/mocks/MockUsers'

export default function UsersPage (): JSX.Element {
  return (
    <PageLayout
      title="Usuarios"
      description='Lista de usuarios del sistema'
    >
      <main>
        <List
          className='container'
          data={MockUsers}
          columns={[
            { header: 'ID', accessorKey: 'id' },
            { header: 'Nombre completo', accessorKey: 'full_name' },
            { header: 'Correo electrónico', accessorKey: 'email' }
          ]}
        />
      </main>
    </PageLayout>
  )
}
