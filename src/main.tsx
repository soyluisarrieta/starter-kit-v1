import React from 'react'
import ReactDOM from 'react-dom/client'
import { TooltipProvider } from '@/components/ui/tooltip.tsx'
import { QueryClientProvider } from 'react-query'
import { queryClient } from '@/lib/react-query.ts'
import Router from './routing/Router.tsx'

import './global.css'
import './lib/nProgress.css'

const darkModeItem = window.localStorage.getItem('dark_mode')
const theme = darkModeItem ? JSON.parse(darkModeItem) : null
const rootClasses = document.documentElement.classList

if (theme && theme.state.darkMode !== undefined) {
  rootClasses[theme.state.darkMode ? 'add' : 'remove']('dark')
} else {
  rootClasses.add('dark')
}

ReactDOM.createRoot(document.getElementById('root') as HTMLDivElement).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  </React.StrictMode>
)
