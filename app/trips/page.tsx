import EmptyState from "@/app/components/EmptyState";
import TripsClient from "@/app/trips//TripsClient";

import getCurrentUser from "@/app/actions/getCurrentUser";
import getReservations from "@/app/actions/getReservations";

const TripsPage = async () => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return (
      <EmptyState
        title="Could not find any trips"
        subtitle="Looks like you're not logged in"
      />
    );
  }

  const reservations = await getReservations({
    userId: currentUser.id,
  });

  if (reservations.length === 0) {
    return (
      <EmptyState
        title="No trips found"
        subtitle="Looks like you have no trips planned"
      />
    );
  }

  return (
    <TripsClient
      reservations={reservations}
      currentUser={currentUser}
    />
  );
};

export default TripsPage;
