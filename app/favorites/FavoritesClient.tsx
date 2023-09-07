"use client";

import { SerializedListing, SerializedUser } from "@/app/types";

import Container from "@/app/components/Container";
import ListingCard from "@/app/components/listings/ListingCard";
import Heading from "@/app/components/Heading";

interface FavoritesClientProps {
  listings: SerializedListing[];
  currentUser: SerializedUser | null;
}

const FavoritesClient: React.FC<FavoritesClientProps> = ({
  listings,
  currentUser,
}) => {
  return (
    <Container>
      <Heading
        title="Favorites"
        subtitle="List of places you've liked"
      />
      <div className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
        {listings.map((listing) => (
          <ListingCard
            key={listing.id}
            data={listing}
            currentUser={currentUser}
          />
        ))}
      </div>
    </Container>
  );
};

export default FavoritesClient;
