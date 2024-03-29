import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface SidebarStore {
  isSidebarOpen: boolean
  toggleSidebar: () => void
}

export const useSidebarStore = create<SidebarStore>()(
  persist((set) => ({
    isSidebarOpen: false,
    toggleSidebar: () => { set(({ isSidebarOpen }) => ({ isSidebarOpen: !isSidebarOpen })) }
  }), { name: 'isSidebarOpen' })
)
