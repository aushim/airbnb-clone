import EmptyState from "@/app/components/EmptyState";
import ReservationsClient from "@/app/reservations/ReservationsClient";
import getCurrentUser from "@/app/actions/getCurrentUser";
import getReservations from "@/app/actions/getReservations";

const reservationsPage = async () => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return (
      <EmptyState
        title="Could not find any reservations"
        subtitle="Looks like you're not logged in"
      />
    );
  }

  const reservations = await getReservations({
    authorId: currentUser.id,
  });

  if (reservations.length === 0) {
    return (
      <EmptyState
        title="No reservations found"
        subtitle="Looks like you have no reservations yet on your properties"
      />
    );
  }

  return (
    <ReservationsClient
      reservations={reservations}
      currentUser={currentUser}
    />
  );
};

export default reservationsPage;
