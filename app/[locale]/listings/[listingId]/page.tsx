import { useTranslations } from "next-intl";

import getCurrentUser from "@/app/actions/getCurrentUser";
import { getListingById } from "@/app/actions/getListingById";
import getReservations from "@/app/actions/getReservations";
import EmptyState from "@/app/components/EmptyState";
import PageContent from "@/app/components/PageContent";
import ListingClient from "@/app/[locale]/listings/[listingId]/ListingClient";

interface IParams {
  listingId?: string;
}

const EmptyListingPage = () => {
  const t = useTranslations("ListingPage");

  return (
    <EmptyState
      title={t("emptyTitle")}
      subtitle={t("emptySubtitle")}
    />
  );
};

const ListingPage = async ({ params }: { params: IParams }) => {
  const listing = await getListingById(params);
  const reservations = await getReservations(params);
  const currentUser = await getCurrentUser();

  if (!listing) {
    return <EmptyListingPage />;
  }

  return (
    <PageContent>
      <ListingClient
        listing={listing}
        reservations={reservations}
        currentUser={currentUser}
      />
    </PageContent>
  );
};

export default ListingPage;
