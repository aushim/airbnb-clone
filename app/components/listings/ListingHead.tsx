"use client";

import { useMemo } from "react";
import useCountries from "@/app/hooks/useCountries";
import { SerializedUser, SerializedPhoto } from "@/app/types";
import Heading from "@/app/components/Heading";
import Image from "next/image";
import HeartButton from "@/app/components/HeartButton";

import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

interface ListingHeadProps {
  title: string;
  locationLabel: string;
  locationCountry: string;
  photos?: SerializedPhoto[];
  id: string;
  currentUser?: SerializedUser | null;
}

const ListingHead: React.FC<ListingHeadProps> = ({
  title,
  locationLabel,
  locationCountry,
  photos,
  id,
  currentUser,
}) => {
  const { getByValue } = useCountries();

  const country = useMemo(
    () => getByValue(locationCountry),
    [locationCountry, getByValue],
  );
  const place = locationLabel?.split(",")[0];
  const location = `${place}${country?.label ? ", " + country.label : ""}`;

  return (
    <>
      <Heading
        title={title}
        subtitle={location}
      />
      {photos && photos.length > 0 && (
        <Swiper
          className="w-full"
          spaceBetween={50}
          modules={[Navigation, Pagination]}
          slidesPerView={1}
          navigation
          pagination={{ clickable: true }}
        >
          {photos.map((photo, index) => (
            <SwiperSlide key={index}>
              <div
                key={index}
                className="relative h-[50vh] w-full overflow-hidden rounded-xl"
              >
                <Image
                  alt="Image"
                  src={photo.url}
                  fill
                  className="w-full object-cover"
                />
                <div className="absolute end-5 top-5">
                  <HeartButton
                    listingId={id}
                    currentUser={currentUser}
                  />
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </>
  );
};

export default ListingHead;
