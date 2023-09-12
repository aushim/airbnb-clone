"use client";

import { Range } from "react-date-range";
import { useTranslations } from "next-intl";

import Calendar from "@/app/components/inputs/Calendar";
import Button from "@/app/components/Button";

interface ListingReservationProps {
  price: number;
  dateRange: Range;
  totalPrice: number;
  onChangeDate: (_: Range) => void;
  onSubmit: () => void;
  disabled: boolean;
  disabledDates: Date[];
}

const ListingReservation: React.FC<ListingReservationProps> = ({
  price,
  dateRange,
  totalPrice,
  onChangeDate,
  onSubmit,
  disabled,
  disabledDates,
}) => {
  const t = useTranslations("ListingReservation");

  return (
    <div className="overflow-hidden rounded-xl border border-neutral-200 bg-white">
      <div className="flex flex-row items-center gap-1 p-4">
        <div className="text-2xl font-semibold">$ {price}</div>
        <div className="font-light text-neutral-600"> {t("night")}</div>
      </div>
      <hr />
      <Calendar
        value={dateRange}
        onChange={(value) => onChangeDate(value.selection)}
        disabledDates={disabledDates}
      />
      <hr />
      <div className="p-4">
        <Button
          disabled={disabled}
          label={t("reserveLabel")}
          onClick={onSubmit}
        />
      </div>
      <div className="flex flex-row items-center justify-between p-4 text-lg font-semibold">
        <div>{t("total")}</div>
        <div>$ {totalPrice}</div>
      </div>
    </div>
  );
};

export default ListingReservation;
