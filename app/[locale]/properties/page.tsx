import { useTranslations } from "next-intl";

import EmptyState from "@/app/components/EmptyState";
import PropertiesClient from "@/app/[locale]/properties/PropertiesClient";

import getCurrentUser from "@/app/actions/getCurrentUser";
import getListings from "@/app/actions/getListings";

const NotLoggedInPropertiesPage = () => {
  const t = useTranslations("PropertiesPage");

  return (
    <EmptyState
      title={t("notLoggedInTitle")}
      subtitle={t("notLoggedInSubtitle")}
    />
  );
};

const EmptyPropertiesPage = () => {
  const t = useTranslations("PropertiesPage");

  return (
    <EmptyState
      title={t("emptyTitle")}
      subtitle={t("emptySubtitle")}
    />
  );
};

const PropertiesPage = async () => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return <NotLoggedInPropertiesPage />;
  }

  const listings = await getListings({
    userId: currentUser.id,
  });

  if (!listings || listings.length === 0) {
    return <EmptyPropertiesPage />;
  }

  return (
    <PropertiesClient
      listings={listings}
      currentUser={currentUser}
    />
  );
};

export default PropertiesPage;
