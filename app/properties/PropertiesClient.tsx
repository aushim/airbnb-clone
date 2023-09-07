"use client";

import axios from "axios";
import { toast } from "react-hot-toast";
import { SerializedListing, SerializedUser } from "@/app/types";
import Container from "@/app/components/Container";
import Heading from "@/app/components/Heading";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import ListingCard from "@/app/components/listings/ListingCard";

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

      axios
        .delete(`/api/listings/${id}`)
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
    <Container>
      <Heading
        title="Properties"
        subtitle="Manage your properties"
      />
      <div className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
        {listings.map((listing) => (
          <ListingCard
            key={listing.id}
            data={listing}
            actionId={listing.id}
            onAction={onDelete}
            disabled={deletingId === listing.id}
            actionLabel="Delete property"
            currentUser={currentUser}
          />
        ))}
      </div>
    </Container>
  );
};

export default PropertiesClient;
