import { useTranslations } from "next-intl";

import EmptyState from "@/app/components/EmptyState";
import FavoritesClient from "@/app/[locale]/favorites/FavoritesClient";
import getCurrentUser from "@/app/actions/getCurrentUser";
import getFavoriteListings from "@/app/actions/getFavoriteListings";

const EmptyFavoritesPage = () => {
  const t = useTranslations("FavoritesPage");

  return (
    <EmptyState
      title={t("emptyTitle")}
      subtitle={t("emptySubtitle")}
    />
  );
};

const FavoritesPage = async () => {
  const currentUser = await getCurrentUser();
  const favoriteListings = await getFavoriteListings();

  if (favoriteListings.length === 0) {
    return <EmptyFavoritesPage />;
  }

  return (
    <FavoritesClient
      listings={favoriteListings}
      currentUser={currentUser}
    />
  );
};

export default FavoritesPage;
