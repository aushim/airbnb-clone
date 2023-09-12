"use client";

import { toast } from "react-hot-toast";
import { SerializedListing, SerializedUser } from "@/app/types";
import PageContent from "@/app/components/PageContent";
import Container from "@/app/components/Container";
import { useRouter } from "next-intl/client";
import { useTranslations } from "next-intl";
import { useCallback, useState } from "react";
import ListingSection from "@/app/components/listings/ListingSection";

interface PropertiesClientProps {
  listings: SerializedListing[];
  currentUser?: SerializedUser | null;
}

const PropertiesClient: React.FC<PropertiesClientProps> = ({
  listings,
  currentUser,
}) => {
  const router = useRouter();
  const t = useTranslations("PropertiesPage");
  const [deletingId, setDeletingId] = useState("");

  const onDelete = useCallback(
    (id: string) => {
      setDeletingId(id);

      fetch(`/api/listings/${id}`, {
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

  return (
    <PageContent>
      <Container>
        <ListingSection
          listings={listings}
          title={t("title")}
          subtitle={t("subtitle")}
          currentUser={currentUser}
          onAction={onDelete}
          actionLabel={t("deleteLabel")}
          deletingId={deletingId}
        />
      </Container>
    </PageContent>
  );
};

export default PropertiesClient;
