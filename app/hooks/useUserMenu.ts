import { create } from "zustand";

interface UserMenuState {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const useUserMenu = create<UserMenuState>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export default useUserMenu;
