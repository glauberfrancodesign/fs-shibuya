import { create } from 'zustand';

interface SidebarState {
  isCollapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
  autoCollapse: () => void;
  autoExpand: () => void;
}

export const useSidebarStore = create<SidebarState>((set) => ({
  isCollapsed: false,
  setCollapsed: (collapsed) => set({ isCollapsed: collapsed }),
  autoCollapse: () => set({ isCollapsed: true }),
  autoExpand: () => set({ isCollapsed: false }),
}));
