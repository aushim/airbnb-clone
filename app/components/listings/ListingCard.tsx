"use client";

import useCountries from "@/app/hooks/useCountries";
import {
  SerializedReservation,
  SerializedListing,
  SerializedUser,
} from "@/app/types";
import { useRouter } from "next/navigation";
import { useCallback, useMemo } from "react";
import { format } from "date-fns";
import Image from "next/image";
import HeartButton from "@/app/components/HeartButton";
import Button from "@/app/components/Button";

import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

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
  const router = useRouter();
  const { getByValue } = useCountries();

  const location = getByValue(data.locationValue);

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

    return `${format(start, "PP")} - ${format(end, "PP")}`;
  }, [reservation]);

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
                  />
                  <div className="absolute right-3 top-3">
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
        <div
          onClick={() => router.push(`/listings/${data.id}`)}
          className="cursor-pointer"
        >
          <div className="text-lg font-semibold">
            {location?.region}, {location?.label}
          </div>
          <div className="font-light text-neutral-500">
            {reservationDate ||
              (data.categories?.length > 0 && data.categories[0])}
          </div>
          <div className="flex flex-row items-center gap-1">
            <div className="font-semibold">$ {price}</div>
            {!reservation && <div className="font-light">/ night</div>}
          </div>
        </div>
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
