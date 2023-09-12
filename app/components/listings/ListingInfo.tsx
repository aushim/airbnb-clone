"use client";

import { IconType } from "react-icons";
import dynamic from "next/dynamic";
import { useTranslations } from "next-intl";

import { SerializedUser } from "@/app/types";
import Avatar from "@/app/components/Avatar";
import ListingCategory from "@/app/components/listings/ListingCategory";
import { CategoryLabel } from "@/app/components/navbar/Categories";

const Map = dynamic(() => import("@/app/components/Map"), {
  ssr: false,
});

interface ListingInfoProps {
  user: SerializedUser;
  description: string;
  guestCount: number;
  roomCount: number;
  bathroomCount: number;
  categories: Array<{
    label: string;
    icon: IconType;
    description: string;
  }>;
  locationLatLng: number[];
}

const ListingInfo: React.FC<ListingInfoProps> = ({
  user,
  description,
  guestCount,
  roomCount,
  bathroomCount,
  categories,
  locationLatLng,
}) => {
  const t = useTranslations("ListingInfo");
  const tCategories = useTranslations("Categories");
  return (
    <div className="col-span-4 flex flex-col gap-8">
      <div className="flex flex-col">
        <div className="flex flex-row items-center gap-2 text-xl font-semibold">
          <Avatar src={user?.image} />
          <div>
            &nbsp;{t("hostedBy")} {user?.name?.split(" ")?.[0]}
          </div>
        </div>
        <br />
        <div className="flex flex-row items-center gap-2 font-medium text-neutral-500">
          <div className="py-1">{t("guestCount", { count: guestCount })}</div>
          <div className="self-start">.</div>
          <div className="py-1">{t("roomCount", { count: roomCount })}</div>
          <div className="self-start">.</div>
          <div className="py-1">
            {t("bathroomCount", { count: bathroomCount })}
          </div>
        </div>
      </div>
      <hr />
      {categories &&
        categories.length > 0 &&
        categories.map((category, index) => (
          <ListingCategory
            key={index}
            icon={category.icon}
            label={tCategories(category.label as CategoryLabel)}
            description={tCategories((category.label + "Description") as any)}
          />
        ))}
      <hr />
      <div className="text-xl font-semibold">{t("aboutLabel")}</div>
      <div className="text-lg font-light text-neutral-500">{description}</div>
      <hr />
      <div className="text-xl font-semibold">{t("locationLabel")}</div>
      <Map center={locationLatLng} />
    </div>
  );
};

export default ListingInfo;
