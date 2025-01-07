import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { TooltipProvider } from '@/components/ui/tooltip.tsx'
import { QueryClientProvider } from 'react-query'
import { queryClient } from '@/lib/react-query.ts'
import moment from 'moment'
import 'moment/dist/locale/es'

import './index.css'
import './lib/nProgress.css'
import App from '@/App.tsx'

moment.locale('es')

const darkModeItem = window.localStorage.getItem('dark_mode')
const theme = darkModeItem ? JSON.parse(darkModeItem) : null
const rootClasses = document.documentElement.classList

if (theme && theme.state.darkMode !== undefined) {
  rootClasses[theme.state.darkMode ? 'add' : 'remove']('dark')
} else {
  rootClasses.add('dark')
}

createRoot(document.getElementById('root') as HTMLDivElement).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <App />
      </TooltipProvider>
    </QueryClientProvider>
  </StrictMode>
)
