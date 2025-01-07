import { useParams } from 'react-router'

export default function UserDetailPage () {
  const { id } = useParams()
  return (
    <div>
      <div>
        <h1>Usuario {id}</h1>
      </div>
    </div>
  )
}
