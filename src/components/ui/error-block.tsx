import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { AlertCircleIcon } from 'lucide-react'

interface Props {
  title?: string
  message: string
  errorState: boolean
}

export function ErrorBlock ({ title = 'Error', message, errorState }: Props): JSX.Element | null {
  return errorState
    ? (
    <Alert variant="destructive">
      <AlertCircleIcon className="h-4 w-4" />
      <AlertTitle>{title}</AlertTitle>
      <AlertDescription>
        {message}
      </AlertDescription>
    </Alert>
      )
    : null
}
