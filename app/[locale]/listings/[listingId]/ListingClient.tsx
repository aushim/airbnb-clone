"use client";

import { toast } from "react-hot-toast";
import { useState, useMemo, useCallback, useEffect } from "react";
import { useRouter } from "next-intl/client";
import { useTranslations } from "next-intl";
import { eachDayOfInterval, differenceInCalendarDays } from "date-fns";
import { Range } from "react-date-range";

import { categories as allCategories } from "@/app/components/navbar/Categories";
import {
  SerializedReservation,
  SerializedListing,
  SerializedUser,
} from "@/app/types";
import Container from "@/app/components/Container";
import ListingHead from "@/app/components/listings/ListingHead";
import ListingInfo from "@/app/components/listings/ListingInfo";
import ListingReservation from "@/app/components/listings/ListingReservation";
import useLoginModal from "@/app/hooks/useLoginModal";

const initialDateRange = {
  startDate: new Date(),
  endDate: new Date(),
  key: "selection",
};

interface ListingClientProps {
  reservations?: SerializedReservation[];
  listing: SerializedListing & { user: SerializedUser };
  currentUser?: SerializedUser | null;
}

const ListingClient: React.FC<ListingClientProps> = ({
  reservations = [],
  listing,
  currentUser,
}) => {
  const t = useTranslations("ListingReservation");
  const loginModal = useLoginModal();
  const router = useRouter();

  const disabledDates = useMemo(() => {
    let dates: Date[] = [];

    reservations.forEach((reservation) => {
      const range = eachDayOfInterval({
        start: new Date(reservation.startDate),
        end: new Date(reservation.endDate),
      });
      dates = [...dates, ...range];
    });

    return dates;
  }, [reservations]);

  const [isLoading, setIsLoading] = useState(false);
  const [totalPrice, setTotalPrice] = useState(listing.price);
  const [dateRange, setDateRange] = useState<Range>(initialDateRange);

  const onCreateReservation = useCallback(() => {
    if (!currentUser) {
      return loginModal.onOpen();
    }

    setIsLoading(true);

    fetch("/api/reservations", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        totalPrice,
        startDate: dateRange.startDate,
        endDate: dateRange.endDate,
        listingId: listing?.id,
      }),
    })
      .then(() => {
        toast.success(t("successMessage"));
        setDateRange(initialDateRange);
        router.push("/trips");
      })
      .catch(() => {
        toast.error(t("errorMessage"));
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [totalPrice, dateRange, listing?.id, router, currentUser, loginModal, t]);

  useEffect(() => {
    if (dateRange.startDate && dateRange.endDate) {
      const dayCount = differenceInCalendarDays(
        dateRange.endDate,
        dateRange.startDate,
      );

      if (dayCount && listing.price) {
        setTotalPrice(dayCount * listing.price);
      } else {
        setTotalPrice(listing.price);
      }
    }
  }, [dateRange, listing.price]);

  const categories = useMemo(() => {
    return allCategories.filter((item) =>
      listing.categories.includes(item.label),
    );
  }, [listing.categories]);

  return (
    <Container>
      <div className="mx-auto max-w-screen-lg">
        <div className="flex flex-col gap-6">
          <ListingHead
            title={listing.title}
            photos={listing.photos}
            locationLabel={listing.locationLabel}
            locationCountry={listing.locationCountry}
            id={listing.id}
            currentUser={currentUser}
          />
          <div className="grid grid-cols-1 pt-6 md:grid-cols-7 md:gap-20">
            <ListingInfo
              user={listing.user}
              categories={categories}
              description={listing.description}
              roomCount={listing.roomCount}
              guestCount={listing.guestCount}
              bathroomCount={listing.bathroomCount}
              locationLatLng={listing.locationLatLng}
            />
            <div className="order-first pb-10 md:order-last md:col-span-3">
              <ListingReservation
                price={listing.price}
                totalPrice={totalPrice}
                onChangeDate={(value) => setDateRange(value)}
                dateRange={dateRange}
                onSubmit={onCreateReservation}
                disabled={isLoading}
                disabledDates={disabledDates}
              />
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default ListingClient;
