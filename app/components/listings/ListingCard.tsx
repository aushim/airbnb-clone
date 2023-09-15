"use client";

import { useCallback, useMemo } from "react";
import Image from "next/image";
import { useFormatter, useTranslations } from "next-intl";
import Link from "next-intl/link";
import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import {
  SerializedReservation,
  SerializedListing,
  SerializedUser,
} from "@/app/types";
import { CategoryLabel } from "@/app/components/navbar/Categories";
import HeartButton from "@/app/components/HeartButton";
import Button from "@/app/components/Button";
import useCountries from "@/app/hooks/useCountries";

interface ListingCardProps {
  data: SerializedListing;
  reservation?: SerializedReservation;
  onAction?: (_: string) => void;
  disabled?: boolean;
  actionLabel?: string;
  actionId?: string;
  currentUser?: SerializedUser | null;
}

const ListingCard: React.FC<ListingCardProps> = ({
  data,
  reservation,
  onAction,
  disabled,
  actionLabel,
  actionId = "",
  currentUser,
}) => {
  const formatter = useFormatter();
  const t = useTranslations("ListingReservation");
  const tCategories = useTranslations("Categories");
  const { getByValue } = useCountries();

  const country = useMemo(
    () => getByValue(data.locationCountry),
    [data.locationCountry, getByValue],
  );
  const place = data.locationLabel?.split(",")[0];
  const location = `${place}${country?.label ? ", " + country.label : ""}`;

  const handleCancel = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();

      if (disabled) return;

      onAction?.(actionId);
    },
    [onAction, actionId, disabled],
  );

  const price = useMemo(() => {
    if (reservation) {
      return reservation.totalPrice;
    }

    return data.price;
  }, [reservation, data.price]);

  const reservationDate = useMemo(() => {
    if (!reservation) return null;

    const start = new Date(reservation.startDate);
    const end = new Date(reservation.endDate);

    return `${formatter.dateTime(start, {
      dateStyle: "medium",
    })} - ${formatter.dateTime(end, {
      dateStyle: "medium",
    })}`;
  }, [reservation, formatter]);

  return (
    <div className="group col-span-1">
      <div className="flex w-full flex-col gap-2">
        {data.photos && data.photos.length > 0 && (
          <Swiper
            className="w-full"
            spaceBetween={50}
            modules={[Navigation, Pagination]}
            slidesPerView={1}
            navigation
            pagination={{ clickable: true }}
          >
            {data.photos.map((photo, index) => (
              <SwiperSlide key={index}>
                <div className="relative aspect-square w-full overflow-hidden rounded-xl">
                  <Image
                    fill
                    alt="Listing"
                    src={photo.url}
                    className="h-full w-full object-cover transition group-hover:scale-110"
                    sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, (max-width: 1280px) 25vw, (max-width: 1536px) 20vw, 16vw"
                  />
                  <div className="absolute end-3 top-3">
                    <HeartButton
                      listingId={data.id}
                      currentUser={currentUser}
                    />
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        )}
        <Link href={`/listings/${data.id}`}>
          <div className="cursor-pointer">
            <div className="text-md font-semibold">{location}</div>
            <div className="text-sm font-light text-neutral-500">
              {reservationDate ||
                (data.categories?.length > 0 &&
                  tCategories(data.categories[0] as CategoryLabel))}
            </div>
            <div className="flex flex-row items-center gap-1 pt-2">
              <div className="font-semibold">$ {price}</div>
              {!reservation && <div className="font-light"> {t("night")}</div>}
            </div>
          </div>
        </Link>
        {onAction && actionLabel && (
          <Button
            disabled={disabled}
            small
            label={actionLabel}
            onClick={handleCancel}
          />
        )}
      </div>
    </div>
  );
};

export default ListingCard;
