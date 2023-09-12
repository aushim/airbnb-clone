"use client";

import React, { useCallback } from "react";
import GooglePlacesAutocomplete, {
  geocodeByPlaceId,
} from "react-google-places-autocomplete";
import { Option } from "react-google-places-autocomplete/build/types";
import { SingleValue } from "react-select";
import { useLocale } from "next-intl";

export type LocationSelectValue = {
  label: string;
  value: Option | null;
  locationId: string;
  latlng: number[];
  countryCode: string | undefined;
};

const LocationOptionTextBox = ({ text }: { text: string }) => (
  <div className="flex flex-row items-center gap-3">
    <div>
      <span className="ml-1 text-neutral-500">{text}</span>
    </div>
  </div>
);

interface LocationSelectProps {
  location?: LocationSelectValue;
  onChange: (_: LocationSelectValue) => void;
}

const LocationSelect: React.FC<LocationSelectProps> = ({
  location,
  onChange,
}) => {
  const locale = useLocale();

  const handleValueChange = useCallback(
    (locationValue: SingleValue<Option>) => {
      if (!locationValue) return;

      if (locationValue?.value?.place_id) {
        geocodeByPlaceId(locationValue?.value?.place_id)
          .then((results) => {
            const { lat, lng } = results[0].geometry.location;
            const latlng = [lat(), lng()];

            const countryCode = results[0].address_components.find((c) =>
              c.types.includes("country"),
            )?.short_name;

            onChange({
              label: locationValue?.value?.description,
              value: locationValue,
              locationId: locationValue?.value?.place_id,
              latlng,
              countryCode,
            });
          })
          .catch(() => {
            return;
          });
      }
    },
    [onChange],
  );

  return (
    <div>
      <GooglePlacesAutocomplete
        apiKey={process.env.NEXT_PUBLIC_GOOGLE_PLACES_API_KEY}
        apiOptions={{ language: locale }}
        autocompletionRequest={{ types: ["(regions)"] }}
        debounce={500}
        selectProps={{
          value: location?.value,
          autoFocus: true,
          noOptionsMessage: () => (
            <LocationOptionTextBox text="Type for suggestions..." />
          ),
          loadingMessage: () => <LocationOptionTextBox text="Loading..." />,
          formatOptionLabel: (option) => (
            <LocationOptionTextBox text={option.label} />
          ),
          placeholder: "Where are you going?",
          components: {
            DropdownIndicator: () => null,
            IndicatorSeparator: () => null,
          },
          onChange: handleValueChange,
          styles: {
            input: (provided) => ({
              ...provided,
              fontSize: "1.125rem",
              lineHeight: "1.75rem",
            }),
            option: (provided) => ({
              ...provided,
              fontSize: "1.125rem",
              lineHeight: "1.75rem",
            }),
            singleValue: (provided) => ({
              ...provided,
              fontSize: "1.125rem",
              lineHeight: "1.75rem",
              marginLeft: "-2px",
            }),
            control: (provided) => ({
              ...provided,
              padding: "0.75rem",
              borderWidth: "2px",
            }),
          },
        }}
      />
    </div>
  );
};

export default LocationSelect;
