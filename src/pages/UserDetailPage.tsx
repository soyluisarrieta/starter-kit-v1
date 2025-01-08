import { useParams } from 'react-router'
import { MockUsers } from '@/mocks/MockUsers'
import Box from '@/components/ui/box'
import { GENDERS } from '@/constants'

export default function UserDetailPage () {
  const { id } = useParams()
  const user = MockUsers.find(user => user.id === id)
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-4">Detalles del Usuario</h1>
      {user ? (
        <Box className='max-w-fit grid grid-cols-2 gap-x-2 odd:[&>p]:text-muted-foreground odd:[&>p]:text-right'>
          <p>ID:</p>
          <p><strong>{id}</strong></p>
          <p>Nombre Completo:</p>
          <p><strong>{user.full_name}</strong></p>
          <p>Correo Electrónico:</p>
          <p><strong>{user.email}</strong></p>
          <p>Género:</p>
          <p>
            <i
              className='size-2 inline-block rounded-full border-2 mr-1'
              style={{ borderColor: GENDERS[user.gender ?? 'other'].color }}
            />
            <strong>{GENDERS[user.gender ?? 'other'].name}</strong>
          </p>
          <p>Estado:</p>
          <p><strong>{user.active ? 'Activo' : 'Inactivo'}</strong></p>
          <p>Creado el:</p>
          <p><strong>{new Date(user.created_at).toLocaleDateString('es-ES')}</strong></p>
          <p>Actualizado el:</p>
          <p><strong>{new Date(user.updated_at).toLocaleDateString('es-ES')}</strong></p>
        </Box>
      ) : (
        <div className="w-fit bg-destructive/5 border border-destructive/50 text-destructive px-4 py-3 rounded relative" role="alert">
          <h2 className="font-bold">Usuario no encontrado:</h2>
          <p className="block sm:inline">El usuario con ID "{id}" no existe o fue eliminado.</p>
        </div>
      )}
    </div>
  )
}
