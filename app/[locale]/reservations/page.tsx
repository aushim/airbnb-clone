import { useTranslations } from "next-intl";

import EmptyState from "@/app/components/EmptyState";
import ReservationsClient from "@/app/[locale]/reservations/ReservationsClient";
import getCurrentUser from "@/app/actions/getCurrentUser";
import getReservations from "@/app/actions/getReservations";

const NotLoggedInReservationsPage = () => {
  const t = useTranslations("ReservationsPage");

  return (
    <EmptyState
      title={t("notLoggedInTitle")}
      subtitle={t("notLoggedInSubtitle")}
    />
  );
};

const EmptyReservationsPage = () => {
  const t = useTranslations("ReservationsPage");

  return (
    <EmptyState
      title={t("emptyTitle")}
      subtitle={t("emptySubtitle")}
    />
  );
};

const ReservationsPage = async () => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return <NotLoggedInReservationsPage />;
  }

  const reservations = await getReservations({
    authorId: currentUser.id,
  });

  if (reservations.length === 0) {
    return <EmptyReservationsPage />;
  }

  return (
    <ReservationsClient
      reservations={reservations}
      currentUser={currentUser}
    />
  );
};

export default ReservationsPage;
