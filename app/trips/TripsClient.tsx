"use client";

import axios from "axios";
import { toast } from "react-hot-toast";
import { SerializedReservation, SerializedUser } from "@/app/types";
import Container from "@/app/components/Container";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import ListingSection from "@/app/components/listings/ListingSection";

interface TripsClientProps {
  reservations: SerializedReservation[];
  currentUser?: SerializedUser | null;
}

const TripsClient: React.FC<TripsClientProps> = ({
  reservations,
  currentUser,
}) => {
  const router = useRouter();
  const [deletingId, setDeletingId] = useState("");

  const onCancel = useCallback(
    (id: string) => {
      setDeletingId(id);

      axios
        .delete(`/api/reservations/${id}`)
        .then(() => {
          toast.success("Reservation cancelled");
          router.refresh();
        })
        .catch(() => {
          toast.error("Something went wrong");
        })
        .finally(() => {
          setDeletingId("");
        });
    },
    [router],
  );

  const today = new Date().toISOString();
  const pastReservations = reservations.filter(
    (reservation) => reservation.startDate <= today,
  );
  const upcomingReservations = reservations.filter(
    (reservation) => reservation.startDate >= today,
  );

  return (
    <Container>
      <ListingSection
        reservations={upcomingReservations}
        title="Upcoming trips"
        subtitle="Where you're going"
        currentUser={currentUser}
        onAction={onCancel}
        deletingId={deletingId}
        actionLabel="Cancel reservation"
        emptyMessage="You have no upcoming trips"
      />
      <hr className="my-10" />
      <ListingSection
        reservations={pastReservations}
        title="Past trips"
        subtitle="Where you've been"
        currentUser={currentUser}
        emptyMessage="You have no past trips"
      />
    </Container>
  );
};

export default TripsClient;
