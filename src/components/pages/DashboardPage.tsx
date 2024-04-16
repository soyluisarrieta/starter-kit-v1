import { useAuth } from '@/hooks/useAuth'

export default function DashboardPage (): JSX.Element {
  const { profile } = useAuth()

  return (
    <main>
      <p className='font-light text-4xl mb-1 opacity-60'>¡Hey, {profile?.name}!</p>
      <p className='font-semibold text-4xl opacity-90'>Bienvenid{profile?.gender_letter} de vuelta</p>
    </main>
  )
}
