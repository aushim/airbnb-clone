"use client";

import { toast } from "react-hot-toast";
import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";

import { SerializedUser, SerializedReservation } from "@/app/types";
import Container from "@/app/components/Container";
import ListingSection from "@/app/components/listings/ListingSection";

interface ReservationsClientProps {
  reservations: SerializedReservation[];
  currentUser?: SerializedUser | null;
}

const ReservationsClient: React.FC<ReservationsClientProps> = ({
  reservations,
  currentUser,
}) => {
  const router = useRouter();
  const [deletingId, setDeletingId] = useState("");

  const onCancel = useCallback(
    (id: string) => {
      setDeletingId(id);

      fetch(`/api/reservations/${id}`, {
        method: "DELETE",
      })
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
  const upcomingReservations = reservations
    .filter((reservation) => reservation.startDate >= today)
    .reverse();

  return (
    <div className="mt-8">
      <Container>
        <ListingSection
          reservations={upcomingReservations}
          title="Upcoming reservations"
          subtitle="Future bookings on your properties"
          currentUser={currentUser}
          onAction={onCancel}
          deletingId={deletingId}
          actionLabel="Cancel guest reservation"
          emptyMessage="No upcoming reservations"
        />
        <hr className="my-16" />
        <ListingSection
          reservations={pastReservations}
          title="Past reservations"
          subtitle="Previous bookings on your properties"
          currentUser={currentUser}
          emptyMessage="No past reservations"
        />
      </Container>
    </div>
  );
};

export default ReservationsClient;
