import { useTranslations } from "next-intl";

import EmptyState from "@/app/components/EmptyState";
import TripsClient from "@/app/[locale]/trips/TripsClient";

import getCurrentUser from "@/app/actions/getCurrentUser";
import getReservations from "@/app/actions/getReservations";

const NotLoggedInTripsPage = () => {
  const t = useTranslations("TripsPage");

  return (
    <EmptyState
      title={t("notLoggedInTitle")}
      subtitle={t("notLoggedInSubtitle")}
    />
  );
};

const EmptyTripsPage = () => {
  const t = useTranslations("TripsPage");

  return (
    <EmptyState
      title={t("emptyTitle")}
      subtitle={t("emptySubtitle")}
    />
  );
};

const TripsPage = async () => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return <NotLoggedInTripsPage />;
  }

  const reservations = await getReservations({
    userId: currentUser.id,
  });

  if (reservations.length === 0) {
    return <EmptyTripsPage />;
  }

  return (
    <TripsClient
      reservations={reservations}
      currentUser={currentUser}
    />
  );
};

export default TripsPage;
