import { create } from "zustand";

interface LangMenuState {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const useLangMenu = create<LangMenuState>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export default useLangMenu;
