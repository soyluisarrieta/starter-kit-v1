import PageLayout from '@/layouts/PageLayout'
import UserForm from '@/components/modules/users/UserForm'
import { DataTable } from '@/components/ui/datatable'
import { MockUsers } from '@/mocks/MockUsers'
import ActionMenu from '@/components/ui/action-menu'
import { useNavigate } from 'react-router'
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from '@/components/ui/sheet'
import { useState } from 'react'
import { AlertDialog, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import { toast } from 'react-toastify'

type EditFormState = { open: boolean, user?: ProfileAuth }
type DeleteDialogState = { show: boolean, user?: ProfileAuth }

export default function UsersPage (): JSX.Element {
  const [editForm, setEditForm] = useState<EditFormState>({ open: false })
  const [deleteDialog, setDeleteDialog] = useState<DeleteDialogState>({ show: false })
  const navigate = useNavigate()

  // Detele user
  const handleDeleteUser = () => {
    const user = deleteDialog.user
    console.log('Delete:',user)
    setDeleteDialog({ show: false })
    toast.success('El usuario ha sido eliminado con exito.')
  }

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
                    onEdit: () => { setEditForm({ open: true, user: row.original }) },
                    onDelete: () => { setDeleteDialog({ show: true, user: row.original }) }
                  }}
                />
              )
            }
          ]}
        />

        {/* Edit form */}
        <Sheet open={editForm.open} onOpenChange={(open) => { setEditForm({ ...editForm, open })} }>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>Editar usuario</SheetTitle>
              <SheetDescription>
                Modifica los campos necesarios para actualizar al usuario.
              </SheetDescription>
            </SheetHeader>
            <div className='py-2'>
              <UserForm user={editForm.user} callback={()=> setEditForm({ open: false })} />
            </div>
          </SheetContent>
        </Sheet>

        {/* Alert delete */}
        <AlertDialog open={deleteDialog.show} onOpenChange={(show) => { setDeleteDialog({ ...deleteDialog, show }) }}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>¿Estás absolutamete seguro?</AlertDialogTitle>
              <AlertDialogDescription>
                Estás a punto de eliminar este usuario. Esta acción es irreversible.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancelar</AlertDialogCancel>
              <Button variant="destructive" onClick={handleDeleteUser}>
                Eliminar
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </main>
    </PageLayout>
  )
}
