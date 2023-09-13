"use client";

import { IconType } from "react-icons";
import { useTranslations } from "next-intl";
import { CategoryLabel } from "@/app/components/navbar/Categories";

interface CategoryInputProps {
  label: string;
  icon: IconType;
  selected: boolean;
  onClick: (_: string) => void;
}

const CategoryInput: React.FC<CategoryInputProps> = ({
  label,
  icon: Icon,
  selected,
  onClick,
}) => {
  const t = useTranslations("Categories");
  return (
    <div
      onClick={() => onClick(label)}
      className={`
        box-border
        flex
        cursor-pointer
        flex-col
        gap-3
        rounded-xl
        border-2
        p-4
        transition
        hover:border-black
        ${selected ? "border-4 border-black" : "border-neutral-200"}
      `}
    >
      <Icon size={30} />
      <div className="font-semibold">{t(label as CategoryLabel)}</div>
    </div>
  );
};

export default CategoryInput;
