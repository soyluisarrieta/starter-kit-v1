import { QueryClient } from '@tanstack/react-query'
export const queryClient = new QueryClient({
  logger: {
    error: () => {},
    log: () => {},
    warn: () => {}
  }
})
