"use client";

import { toast } from "react-hot-toast";
import { SerializedListing, SerializedUser } from "@/app/types";
import PageContent from "@/app/components/PageContent";
import Container from "@/app/components/Container";
import { useRouter } from "next/navigation";
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
  const [deletingId, setDeletingId] = useState("");

  const onDelete = useCallback(
    (id: string) => {
      setDeletingId(id);

      fetch(`/api/listings/${id}`, {
        method: "DELETE",
      })
        .then(() => {
          toast.success("Property listing deleted");
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

  return (
    <PageContent>
      <Container>
        <ListingSection
          listings={listings}
          title="Properties"
          subtitle="Manage your properties"
          currentUser={currentUser}
          onAction={onDelete}
          actionLabel="Delete property"
          deletingId={deletingId}
        />
      </Container>
    </PageContent>
  );
};

export default PropertiesClient;
