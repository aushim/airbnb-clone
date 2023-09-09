"use client";

import { SerializedListing, SerializedUser } from "@/app/types";

import PageContent from "@/app/components/PageContent";
import Container from "@/app/components/Container";
import ListingSection from "@/app/components/listings/ListingSection";

interface FavoritesClientProps {
  listings: SerializedListing[];
  currentUser: SerializedUser | null;
}

const FavoritesClient: React.FC<FavoritesClientProps> = ({
  listings,
  currentUser,
}) => {
  return (
    <PageContent>
      <Container>
        <ListingSection
          listings={listings}
          title="Favorites"
          subtitle="List of places you've liked"
          currentUser={currentUser}
        />
      </Container>
    </PageContent>
  );
};

export default FavoritesClient;
