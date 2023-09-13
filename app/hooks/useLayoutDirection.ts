const localeDirectionMap: { [key: string]: string } = {
  en: "ltr",
  es: "ltr",
  ar: "rtl",
  zh: "ltr",
  hi: "ltr",
  fr: "ltr",
  he: "rtl",
};

const useLayoutDirection = () => {
  const getByLocaleString = (value: string) => {
    return localeDirectionMap[value] || "ltr";
  };

  return {
    getByLocaleString,
  };
};

export default useLayoutDirection;
