import "@/app/[locale]/globals.css";

import deepmerge from "deepmerge";
import { Nunito } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { useLocale } from "next-intl";
import { notFound } from "next/navigation";

import Navbar from "@/app/components/navbar/Navbar";
import SearchModal from "@/app/components/modals/SearchModal";
import RentModal from "@/app/components/modals/RentModal";
import LoginModal from "@/app/components/modals/LoginModal";
import RegisterModal from "@/app/components/modals/RegisterModal";
import ToasterProvider from "@/app/providers/ToasterProvider";
import getCurrentUser from "@/app/actions/getCurrentUser";

const font = Nunito({ subsets: ["latin"] });

const getMessages = async (locale: string) => {
  let messages;
  try {
    let userMessages = {};
    try {
      userMessages = (await import(`../../messages/${locale}.json`)).default;
    } catch (error) {
      console.error(error);
    }
    const defaultMessages = (await import(`../../messages/en.json`)).default;
    messages = deepmerge(defaultMessages, userMessages);
  } catch (error) {
    notFound();
  }

  return messages;
};

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}) {
  const { locale } = params;
  const messages = await getMessages(locale);
  return {
    title: messages?.Home?.title || "Holidy Homes & Apartment Rentals",
  };
}

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const locale = useLocale();

  // Validate that the incoming `locale` parameter is a valid locale
  if (params.locale !== locale) {
    notFound();
  }

  const messages = await getMessages(locale);
  const currentUser = await getCurrentUser();

  return (
    <html lang={locale}>
      <body className={font.className}>
        <NextIntlClientProvider
          locale={locale}
          messages={messages}
        >
          <ToasterProvider />
          <SearchModal />
          <RentModal />
          <LoginModal />
          <RegisterModal />
          <Navbar currentUser={currentUser} />
          <div className="pb-20 pt-28">{children}</div>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
