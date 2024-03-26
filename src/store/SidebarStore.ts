import { create } from 'zustand'

interface SidebarStore {
  sidebarOpen: boolean
  toggleSidebar: () => void
}

export const useSidebarStore = create<SidebarStore>((set) => ({
  sidebarOpen: false,
  toggleSidebar: () => {
    set(({ sidebarOpen }) => ({ sidebarOpen: !sidebarOpen }))
  }
}))
