"use client";

import useUserMenu from "@/app/hooks/useUserMenu";
import useLangMenu from "@/app/hooks/useLangMenu";
import Image from "next/image";

interface MenuItemProps {
  onClick: () => void;
  imageSrc?: string;
  label: string;
}

const MenuItem: React.FC<MenuItemProps> = ({ onClick, label, imageSrc }) => {
  const userMenu = useUserMenu();
  const langMenu = useLangMenu();

  const onMenuItemClick = (action: () => void) => {
    return () => {
      userMenu.onClose();
      langMenu.onClose();
      action();
    };
  };

  return (
    <div
      onClick={onMenuItemClick(onClick)}
      className="flex flex-row items-center gap-2 px-4 py-3 transition hover:bg-neutral-100"
    >
      {imageSrc && (
        <div className="relative aspect-square h-4 w-4 overflow-hidden rounded-xl">
          <Image
            alt={label}
            fill
            src={imageSrc}
            priority
          />
        </div>
      )}
      <div className="font-normal">{label}</div>
    </div>
  );
};

export default MenuItem;
