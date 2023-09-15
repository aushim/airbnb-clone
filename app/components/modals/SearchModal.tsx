"use client";

import qs from "query-string";
import dynamic from "next/dynamic";
import { formatISO } from "date-fns";
import { useState, useMemo, useCallback } from "react";
import { useSearchParams } from "next/navigation";
import { Range } from "react-date-range";
import { useRouter } from "next-intl/client";
import { useTranslations } from "next-intl";

import Modal from "@/app/components/modals/Modal";
import useSearchModal from "@/app/hooks/useSearchModal";
import { LocationSelectValue } from "@/app/components/inputs/LocationSelect";
import Heading from "@/app/components/Heading";
import LocationSelect from "@/app/components/inputs/LocationSelect";
import Calendar from "@/app/components/inputs/Calendar";
import Counter from "@/app/components/inputs/Counter";

enum STEPS {
  LOCATION = 0,
  DATE = 1,
  INFO = 2,
}

const SearchModal = () => {
  const router = useRouter();
  const t = useTranslations("SearchModal");
  const params = useSearchParams();
  const searchModal = useSearchModal();

  const [step, setStep] = useState(STEPS.LOCATION);
  const [location, setLocation] = useState<LocationSelectValue>();
  const [guestCount, setGuestCount] = useState(1);
  const [roomCount, setRoomCount] = useState(1);
  const [bathroomCount, setBathroomCount] = useState(1);
  const [dateRange, setDateRange] = useState<Range>({
    startDate: new Date(),
    endDate: new Date(),
    key: "selection",
  });

  const Map = useMemo(() => {
    location?.latlng;
    return dynamic(() => import("@/app/components/Map"), { ssr: false });
  }, [location?.latlng]);

  const onBack = useCallback(() => {
    setStep((prev) => prev - 1);
  }, []);

  const onNext = useCallback(() => {
    setStep((prev) => prev + 1);
  }, []);

  const onSubmit = useCallback(async () => {
    if (step !== STEPS.INFO) {
      return onNext();
    }

    const currentQuery = params ? qs.parse(params.toString()) : {};

    const updatedQuery: qs.ParsedQuery<string | number | undefined> = {
      ...currentQuery,
      location: location?.label,
      guestCount,
      roomCount,
      bathroomCount,
    };

    if (dateRange.startDate) {
      updatedQuery.startDate = formatISO(dateRange.startDate);
    }

    if (dateRange.endDate) {
      updatedQuery.endDate = formatISO(dateRange.endDate);
    }

    const url = qs.stringifyUrl(
      {
        url: "/",
        query: updatedQuery,
      },
      { skipNull: true },
    );

    setStep(STEPS.LOCATION);
    searchModal.onClose();

    router.push(url);
  }, [
    step,
    searchModal,
    location,
    router,
    guestCount,
    roomCount,
    bathroomCount,
    dateRange,
    onNext,
    params,
  ]);

  const actionLabel = useMemo(() => {
    if (step === STEPS.INFO) {
      return t("finalActionLabel");
    }

    return t("actionLabel");
  }, [step, t]);

  const secondaryActionLabel = useMemo(() => {
    if (step === STEPS.LOCATION) {
      return undefined;
    }

    return t("secondaryActionLabel");
  }, [step, t]);

  const modalContent = {
    body: (
      <div className="flex flex-col gap-8">
        <Heading
          title={t("locationStepTitle")}
          subtitle={t("locationStepSubtitle")}
        />
        <LocationSelect
          location={location}
          onChange={(value) => setLocation(value as LocationSelectValue)}
        />
        <hr />
        <Map center={location?.latlng} />
      </div>
    ) as JSX.Element,
  };

  if (step === STEPS.DATE) {
    modalContent.body = (
      <div className="flex flex-col gap-8">
        <Heading
          title={t("dateStepTitle")}
          subtitle={t("dateStepSubtitle")}
        />
        <Calendar
          value={dateRange}
          onChange={(value) => setDateRange(value.selection)}
        />
      </div>
    );
  }

  if (step === STEPS.INFO) {
    modalContent.body = (
      <div className="flex flex-col gap-8">
        <Heading
          title={t("infoStepTitle")}
          subtitle={t("infoStepSubtitle")}
        />
        <Counter
          title={t("guestsInputTitle")}
          subtitle={t("guestsInputSubtitle")}
          value={guestCount}
          onChange={(value) => setGuestCount(value)}
        />
        <hr />
        <Counter
          title={t("roomsInputTitle")}
          subtitle={t("roomsInputSubtitle")}
          value={roomCount}
          onChange={(value) => setRoomCount(value)}
        />
        <hr />
        <Counter
          title={t("bathroomsInputTitle")}
          subtitle={t("bathroomsInputSubtitle")}
          value={bathroomCount}
          onChange={(value) => setBathroomCount(value)}
        />
      </div>
    );
  }

  return (
    <Modal
      isOpen={searchModal.isOpen}
      onClose={searchModal.onClose}
      onSubmit={onSubmit}
      title={t("modalLabel")}
      actionLabel={actionLabel}
      secondaryAction={step === STEPS.LOCATION ? undefined : onBack}
      secondaryActionLabel={secondaryActionLabel}
      body={modalContent.body}
    />
  );
};

export default SearchModal;
