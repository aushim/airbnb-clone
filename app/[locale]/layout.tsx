import "@/app/[locale]/globals.css";

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

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}) {
  const { locale } = params;
  const messages = (await import(`../../messages/${locale}.json`)).default;

  return {
    title: messages.Home.title,
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

  let messages;
  try {
    messages = (await import(`../../messages/${locale}.json`)).default;
  } catch (error) {
    notFound();
  }

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
