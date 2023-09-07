"use client";

import useMenu from "@/app/hooks/useMenu";

interface MenuItemProps {
  onClick: () => void;
  label: string;
}

const MenuItem: React.FC<MenuItemProps> = ({ onClick, label }) => {
  const menu = useMenu();

  const onMenuItemClick = (action: () => void) => {
    return () => {
      action();
      menu.onClose();
    };
  };

  return (
    <div
      onClick={onMenuItemClick(onClick)}
      className="px-4 py-3 font-semibold transition hover:bg-neutral-100"
    >
      {label}
    </div>
  );
};

export default MenuItem;
