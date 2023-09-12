import { enUS, es, arSA, zhCN, hi, fr, he } from "date-fns/locale";

const localeMap: { [key: string]: Locale } = {
  en: enUS,
  es: es,
  ar: arSA,
  zh: zhCN,
  hi: hi,
  fr: fr,
  he: he,
};

const useDateLocale = () => {
  const getByLocaleString = (value: string) => {
    return localeMap[value] || enUS;
  };

  return {
    getByLocaleString,
  };
};

export default useDateLocale;
