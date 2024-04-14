import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface ThemeStore {
  darkMode: boolean
  toggleDarkMode: () => void
  setDarkMode: (isDarkMode: boolean) => void
}

const root = window.document.documentElement

export const useThemeStore = create<ThemeStore>()(
  persist((set) => ({
    darkMode: true,
    toggleDarkMode: () => { set((state) => ({ darkMode: !state.darkMode })) },
    setDarkMode: (isDarkMode) => {
      set(() => {
        root.classList[isDarkMode ? 'add' : 'remove']('dark')
        return { darkMode: isDarkMode }
      })
    }
  }), { name: 'dark_mode' })
)
