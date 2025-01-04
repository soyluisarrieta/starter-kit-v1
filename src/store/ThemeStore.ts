import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface ThemeStore {
  darkMode: boolean
  toggleDarkMode: () => void
  setDarkMode: (isDarkMode: boolean) => void
}

const root = window.document.documentElement
const darkModeItem = window.localStorage.getItem('dark_mode')
const theme = darkModeItem ? JSON.parse(darkModeItem) : null
root.style.colorScheme = theme?.state.darkMode ? 'dark' : theme ? 'light' : 'dark'

export const useThemeStore = create<ThemeStore>()(
  persist((set) => ({
    darkMode: true,
    toggleDarkMode: () => {
      set((state) => {
        const isDarkMode = !state.darkMode
        root.classList[isDarkMode ? 'add' : 'remove']('dark')
        root.style.colorScheme = isDarkMode ? 'dark' : 'light'
        return { darkMode: isDarkMode }
      })
    },
    setDarkMode: (isDarkMode) => {
      set(() => {
        root.classList[isDarkMode ? 'add' : 'remove']('dark')
        root.style.colorScheme = isDarkMode ? 'dark' : 'light'
        return { darkMode: isDarkMode }
      })
    }
  }), { name: 'dark_mode' })
)
