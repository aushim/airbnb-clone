"use client";

import { BiSearch } from "react-icons/bi";
import { useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";

import useCountries from "@/app/hooks/useCountries";
import useSearchModal from "@/app/hooks/useSearchModal";
import { useMemo } from "react";
import { differenceInDays } from "date-fns";

const Search = () => {
  const t = useTranslations("Search");
  const searchModal = useSearchModal();
  const params = useSearchParams();
  const { getByValue } = useCountries();

  const locationValue = params?.get("locationValue");
  const startDate = params?.get("startDate");
  const endDate = params?.get("endDate");
  const guestCount = params?.get("guestCount");

  const locationLabel = useMemo(() => {
    if (locationValue) {
      return getByValue(locationValue as string)?.label;
    }

    return t("defaultLocationLabel");
  }, [locationValue, getByValue, t]);

  const durationLabel = useMemo(() => {
    if (startDate && endDate) {
      const start = new Date(startDate as string);
      const end = new Date(endDate as string);
      const diff = differenceInDays(end, start);

      return t("durationLabel", { count: diff });
    }

    return t("defaultDurationLabel");
  }, [startDate, endDate, t]);

  const guestLabel = useMemo(() => {
    if (guestCount) {
      const intGuestCount = parseInt(guestCount);
      return t("guestLabel", { count: intGuestCount });
    }

    return t("defaultGuestLabel");
  }, [guestCount, t]);

  return (
    <div
      onClick={searchModal.onOpen}
      className="ms-auto cursor-pointer rounded-full border py-2 shadow-sm transition hover:shadow-md sm:mx-auto md:w-auto"
    >
      <div className="flex flex-row items-center justify-between">
        <div className="hidden text-sm font-semibold sm:block sm:px-4">
          {locationLabel}
        </div>
        <div className="hidden flex-1 border-0 text-center text-sm font-semibold sm:block sm:border-x sm:px-4">
          {durationLabel}
        </div>
        <div className="flex flex-row items-center gap-3 px-2 text-sm text-gray-600 sm:ps-4">
          <div className="hidden sm:block">{guestLabel}</div>
          <div className="text-full rounded-full bg-rose-500 p-2 text-white">
            <BiSearch size={18} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Search;
