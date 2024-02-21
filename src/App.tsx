import { Button } from '@/components/ui/button'
import { Toaster } from '@/components/ui/sonner'

export default function App (): JSX.Element {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center">
      Hello world
      <Button>Shadcn</Button>
      <Toaster />
    </div>
  )
}
