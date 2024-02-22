import { Toaster } from 'sonner'

export default function MasterLayout ({ children }: ComponentProps): JSX.Element {
  return (
    <>
      {children}
      <Toaster />
    </>
  )
}
