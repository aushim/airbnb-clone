import EmptyState from "@/app/components/EmptyState";
import FavoritesClient from "@/app/favorites/FavoritesClient";
import getCurrentUser from "@/app/actions/getCurrentUser";
import getFavoriteListings from "@/app/actions/getFavoriteListings";

const FavoritesPage = async () => {
  const currentUser = await getCurrentUser();
  const favoriteListings = await getFavoriteListings();

  if (favoriteListings.length === 0) {
    return (
      <EmptyState
        title="No favorites found"
        subtitle="Looks like you have no favorite listings"
      />
    );
  }

  return (
    <FavoritesClient
      listings={favoriteListings}
      currentUser={currentUser}
    />
  );
};

export default FavoritesPage;
