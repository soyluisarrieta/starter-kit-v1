import React from 'react'
import ReactDOM from 'react-dom/client'
import { TooltipProvider } from '@/components/ui/tooltip.tsx'
import { QueryClientProvider } from 'react-query'
import { queryClient } from '@/lib/react-query.ts'
import Router from './Router.tsx'

import './global.css'
import './lib/nProgress.css'

ReactDOM.createRoot(document.getElementById('root') as HTMLDivElement).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  </React.StrictMode>
)
