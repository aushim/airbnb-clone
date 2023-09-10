"use client";

import { IconType } from "react-icons";
import dynamic from "next/dynamic";

import { SerializedUser } from "@/app/types";
import Avatar from "@/app/components/Avatar";
import ListingCategory from "@/app/components/listings/ListingCategory";

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
  return (
    <div className="col-span-4 flex flex-col gap-8">
      <div className="flex flex-col">
        <div className="flex flex-row items-center gap-2 text-xl font-semibold">
          <Avatar src={user?.image} />
          <div>&nbsp;Hosted by {user?.name?.split(" ")?.[0]}</div>
        </div>
        <br />
        <div className="flex flex-row items-center gap-2 font-medium text-neutral-500">
          <div className="py-1">{guestCount} guests</div>
          <div className="self-start">.</div>
          <div className="py-1">{roomCount} rooms</div>
          <div className="self-start">.</div>
          <div className="py-1">{bathroomCount} bathrooms</div>
        </div>
      </div>
      <hr />
      {categories &&
        categories.length > 0 &&
        categories.map((category, index) => (
          <ListingCategory
            key={index}
            icon={category.icon}
            label={category.label}
            description={category.description}
          />
        ))}
      <hr />
      <div className="text-xl font-semibold">About this property</div>
      <div className="text-lg font-light text-neutral-500">{description}</div>
      <hr />
      <div className="text-xl font-semibold">Where you&apos;ll be</div>
      <Map center={locationLatLng} />
    </div>
  );
};

export default ListingInfo;
