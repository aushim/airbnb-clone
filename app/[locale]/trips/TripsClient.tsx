"use client";

import { toast } from "react-hot-toast";
import { SerializedReservation, SerializedUser } from "@/app/types";
import Container from "@/app/components/Container";
import { useRouter } from "next-intl/client";
import { useTranslations } from "next-intl";
import { useCallback, useState } from "react";
import ListingSection from "@/app/components/listings/ListingSection";
import PageContent from "@/app/components/PageContent";

interface TripsClientProps {
  reservations: SerializedReservation[];
  currentUser?: SerializedUser | null;
}

const TripsClient: React.FC<TripsClientProps> = ({
  reservations,
  currentUser,
}) => {
  const router = useRouter();
  const t = useTranslations("TripsPage");
  const [deletingId, setDeletingId] = useState("");

  const onCancel = useCallback(
    (id: string) => {
      setDeletingId(id);

      fetch(`/api/reservations/${id}`, {
        method: "DELETE",
      })
        .then(() => {
          toast.success(t("successMessage"));
          router.refresh();
        })
        .catch(() => {
          toast.error(t("errorMessage"));
        })
        .finally(() => {
          setDeletingId("");
        });
    },
    [router, t],
  );

  const today = new Date().toISOString();
  const pastReservations = reservations.filter(
    (reservation) => reservation.startDate <= today,
  );
  const upcomingReservations = reservations
    .filter((reservation) => reservation.startDate >= today)
    .reverse();

  return (
    <PageContent>
      <Container>
        <ListingSection
          reservations={upcomingReservations}
          title={t("title")}
          subtitle={t("subtitle")}
          currentUser={currentUser}
          onAction={onCancel}
          deletingId={deletingId}
          actionLabel={t("cancelLabel")}
          emptyMessage={t("emptyMessage")}
        />
        {pastReservations.length > 0 && (
          <>
            <hr className="py-16" />
            <ListingSection
              reservations={pastReservations}
              title={t("pastTitle")}
              subtitle={t("pastSubtitle")}
              currentUser={currentUser}
              emptyMessage={t("pastEmptyMessage")}
            />
          </>
        )}
      </Container>
    </PageContent>
  );
};

export default TripsClient;
