import { create } from "zustand";

interface MenuState {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const useMenu = create<MenuState>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export default useMenu;
