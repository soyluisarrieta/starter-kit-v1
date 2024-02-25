import { Toaster } from 'sonner'

export default function MasterLayout ({ children }: ComponentProps): JSX.Element {
  return (
    <>
      <h1>Master</h1>
      {children}
      <Toaster />
    </>
  )
}
