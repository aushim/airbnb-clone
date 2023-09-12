"use client";

import { useLocale } from "next-intl";
import { DateRange, Range, RangeKeyDict } from "react-date-range";

import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file

import useDateLocale from "@/app/hooks/useDateLocale";

interface CalendarProps {
  value: Range;
  onChange: (_: RangeKeyDict) => void;
  disabledDates?: Date[];
}

const Calendar: React.FC<CalendarProps> = ({
  value,
  onChange,
  disabledDates,
}) => {
  const locale = useLocale();
  const { getByLocaleString } = useDateLocale();

  const dateLocale = getByLocaleString(locale);

  return (
    <DateRange
      rangeColors={["#262626"]}
      ranges={[value]}
      date={new Date()}
      onChange={onChange}
      direction="vertical"
      showDateDisplay={false}
      minDate={new Date()}
      disabledDates={disabledDates}
      locale={dateLocale}
    />
  );
};

export default Calendar;
