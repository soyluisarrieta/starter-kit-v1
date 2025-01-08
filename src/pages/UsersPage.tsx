import PageLayout from '@/layouts/PageLayout'
import UserForm from '@/components/modules/users/UserForm'
import { DataTable } from '@/components/ui/datatable'
import { MockUsers } from '@/mocks/MockUsers'
import ActionMenu from '@/components/ui/action-menu'
import { useNavigate } from 'react-router'
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from '@/components/ui/sheet'
import { useState } from 'react'

type EditFormState = { open: boolean, data?: ProfileAuth }

export default function UsersPage (): JSX.Element {
  const [editForm, setEditForm] = useState<EditFormState>({ open: false })
  const navigate = useNavigate()

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
            },
            {
              header: ' ',
              className: 'w-0',
              cell: ({ row }) => (
                <ActionMenu
                  defaultActions={{
                    onDetails: () => { navigate(row.original.id) },
                    onEdit: () => { setEditForm({ open: true, data: row.original }) },
                    onDelete: () => { console.log('delete', row.original) }
                  }}
                />
              )
            }
          ]}
        />

        <Sheet open={editForm.open} onOpenChange={(open) => { setEditForm({ ...editForm, open })} }>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>Editar usuario</SheetTitle>
              <SheetDescription>
                Modifica los campos necesarios para actualizar al usuario.
              </SheetDescription>
            </SheetHeader>
            <div className='py-2'>
              <UserForm user={editForm.data} callback={()=> setEditForm({ open: false })} />
            </div>
          </SheetContent>
        </Sheet>
      </main>
    </PageLayout>
  )
}
