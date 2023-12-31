"use client";

import qs from "query-string";
import { useRouter } from "next-intl/client";
import { useTranslations } from "next-intl";
import { useSearchParams } from "next/navigation";
import { useCallback } from "react";
import { IconType } from "react-icons";

import { CategoryLabel } from "@/app/components/navbar/Categories";

interface CategoryBoxProps {
  icon: IconType;
  label: string;
  selected: boolean;
}

const CategoryBox: React.FC<CategoryBoxProps> = ({
  icon: Icon,
  label,
  selected,
}) => {
  const router = useRouter();
  const t = useTranslations("Categories");
  const params = useSearchParams();

  const handleClick = useCallback(() => {
    const currentQuery = params ? qs.parse(params.toString()) : {};

    const updatedQuery: qs.ParsedQuery<string> = {
      ...currentQuery,
      category: label,
    };

    if (params?.get("category") === label) {
      delete updatedQuery.category;
    }

    const url = qs.stringifyUrl(
      {
        url: "/",
        query: updatedQuery,
      },
      { skipNull: true },
    );

    router.push(url);
  }, [label, params, router]);

  return (
    <div
      onClick={handleClick}
      className={`
        flex
        cursor-pointer
        flex-col
        items-center
        justify-center
        gap-2
        border-b-2
        p-3
        transition
        hover:text-neutral-800
        ${selected ? "border-b-neutral-800" : "border-transparent"}
        ${selected ? "text-neutral-800" : "text-neutral-500"}
      `}
    >
      <Icon size={26} />
      <div className="text-sm font-medium">{t(label as CategoryLabel)}</div>
    </div>
  );
};

export default CategoryBox;
