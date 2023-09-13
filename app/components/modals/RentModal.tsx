"use client";

import dynamic from "next/dynamic";
import toast from "react-hot-toast";
import { useMemo, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { useRouter } from "next-intl/client";
import { useTranslations } from "next-intl";

import useRentModal from "@/app/hooks/useRentModal";
import Modal from "@/app/components/modals/Modal";
import Heading from "@/app/components/Heading";
import { categories as allCategories } from "@/app/components/navbar/Categories";
import CategoryInput from "@/app/components/inputs/CategoryInput";
import LocationSelect, {
  LocationSelectValue,
} from "@/app/components/inputs/LocationSelect";
import { Option } from "react-google-places-autocomplete/build/types";

import Counter from "@/app/components/inputs/Counter";
import ImageUpload, {
  ImageUploadResult,
} from "@/app/components/inputs/ImageUpload";
import Input from "@/app/components/inputs/Input";

enum STEPS {
  CATEGORY = 0,
  LOCATION = 1,
  INFO = 2,
  PHOTOS = 3,
  DESCRIPTION = 4,
  PRICE = 5,
}

const RentModal = () => {
  const router = useRouter();
  const t = useTranslations("RentModal");
  const rentModal = useRentModal();

  const [step, setStep] = useState(STEPS.CATEGORY);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
    reset,
  } = useForm<FieldValues>({
    defaultValues: {
      categories: [] as string[],
      locationLabel: "",
      locationValue: null,
      locationId: "",
      locationLatLng: null,
      locationCountry: "",
      guestCount: 1,
      roomCount: 1,
      bathroomCount: 1,
      photos: [] as ImageUploadResult[],
      price: 1,
      title: "",
      description: "",
    },
  });

  const categories: string[] = watch("categories");
  const locationLabel: string = watch("locationLabel");
  const locationValue: Option = watch("locationValue");
  const locationId: string = watch("locationId");
  const locationLatLng: number[] = watch("locationLatLng");
  const locationCountry: string = watch("locationCountry");
  const guestCount: number = watch("guestCount");
  const roomCount: number = watch("roomCount");
  const bathroomCount: number = watch("bathroomCount");
  const photos: ImageUploadResult[] = watch("photos");

  const Map = useMemo(() => {
    locationLatLng;
    return dynamic(() => import("@/app/components/Map"), {
      ssr: false,
    });
  }, [locationLatLng]);

  const setCustomValue = (id: string, value: any) => {
    setValue(id, value, {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true,
    });
  };

  const onBack = () => {
    setStep((prev) => prev - 1);
  };

  const onNext = () => {
    setStep((prev) => prev + 1);
  };

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    if (step !== STEPS.PRICE) {
      return onNext();
    }

    setIsLoading(true);

    fetch("/api/listings", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(() => {
        toast.success(t("successMessage"));
        router.refresh();
        reset();
        setStep(STEPS.CATEGORY);
        rentModal.onClose();
      })
      .catch(() => {
        toast.error(t("errorMessage"));
      })
      .finally(() => {
        setIsLoading(false);
      });
  };
  const actionLabel = useMemo(() => {
    if (step === STEPS.PRICE) {
      return t("finalActionLabel");
    }

    return t("actionLabel");
  }, [step, t]);

  const secondaryActionLabel = useMemo(() => {
    if (step === STEPS.CATEGORY) {
      return undefined;
    }

    return t("secondaryActionLabel");
  }, [step, t]);

  let bodyContent = (
    <div className="flex flex-col gap-8">
      <Heading
        title={t("categoriesStepTitle")}
        subtitle={t("categoriesStepSubtitle")}
      />
      <div className="grid max-h-[50vh] grid-cols-2 gap-3 overflow-y-auto">
        {allCategories.map((item) => (
          <div
            key={item.label}
            className="col-span-1"
          >
            <CategoryInput
              label={item.label}
              selected={categories.includes(item.label)}
              icon={item.icon}
              onClick={(category) =>
                !categories.includes(category)
                  ? setCustomValue("categories", [...categories, category])
                  : setCustomValue(
                      "categories",
                      categories.filter((c: any) => c !== category),
                    )
              }
            />
          </div>
        ))}
      </div>
    </div>
  );

  if (step === STEPS.LOCATION) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title={t("locationStepTitle")}
          subtitle={t("locationStepSubtitle")}
        />
        <LocationSelect
          location={
            {
              label: locationLabel,
              value: locationValue,
              latlng: locationLatLng,
              countryCode: locationCountry,
              locationId: locationId,
            } as LocationSelectValue
          }
          onChange={(value: LocationSelectValue) => {
            setCustomValue("locationLabel", value?.label);
            setCustomValue("locationValue", value?.value);
            setCustomValue("locationId", value?.locationId);
            setCustomValue("locationLatLng", value?.latlng);
            setCustomValue("locationCountry", value?.countryCode);
          }}
        />
        <Map center={locationLatLng} />
      </div>
    );
  }

  if (step === STEPS.INFO) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title={t("infoStepTitle")}
          subtitle={t("infoStepSubtitle")}
        />
        <Counter
          title={t("guestsInputTitle")}
          subtitle={t("guestsInputSubtitle")}
          value={guestCount}
          onChange={(value) => setCustomValue("guestCount", value)}
        />
        <hr />
        <Counter
          title={t("roomsInputTitle")}
          subtitle={t("roomsInputSubtitle")}
          value={roomCount}
          onChange={(value) => setCustomValue("roomCount", value)}
        />
        <hr />
        <Counter
          title={t("bathroomsInputTitle")}
          subtitle={t("bathroomsInputSubtitle")}
          value={bathroomCount}
          onChange={(value) => setCustomValue("bathroomCount", value)}
        />
      </div>
    );
  }

  if (step === STEPS.PHOTOS) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title={t("photosStepTitle")}
          subtitle={t("photosStepSubtitle")}
        />
        <ImageUpload
          value={photos}
          onChange={(val: ImageUploadResult[]) => setCustomValue("photos", val)}
        />
      </div>
    );
  }

  if (step === STEPS.DESCRIPTION) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title={t("descriptionStepTitle")}
          subtitle={t("descriptionStepSubtitle")}
        />
        <Input
          id="title"
          label={t("titleInputLabel")}
          disabled={isLoading}
          register={register}
          errors={errors}
          required
        />
        <hr />
        <Input
          id="description"
          label={t("descriptionInputLabel")}
          disabled={isLoading}
          register={register}
          errors={errors}
          required
        />
      </div>
    );
  }

  if (step === STEPS.PRICE) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title={t("priceStepTitle")}
          subtitle={t("priceStepSubtitle")}
        />
        <Input
          id="price"
          label={t("priceInputLabel")}
          formatPrice
          disabled={isLoading}
          register={register}
          errors={errors}
          required
        />
      </div>
    );
  }

  return (
    <Modal
      title={t("modalLabel")}
      isOpen={rentModal.isOpen}
      onClose={rentModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      actionLabel={actionLabel}
      secondaryActionLabel={secondaryActionLabel}
      secondaryAction={step === STEPS.CATEGORY ? undefined : onBack}
      body={bodyContent}
    />
  );
};

export default RentModal;
