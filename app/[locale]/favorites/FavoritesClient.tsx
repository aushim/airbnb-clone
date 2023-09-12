"use client";

import { useTranslations } from "next-intl";

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
  const t = useTranslations("FavoritesPage");

  return (
    <PageContent>
      <Container>
        <ListingSection
          listings={listings}
          title={t("title")}
          subtitle={t("subtitle")}
          currentUser={currentUser}
        />
      </Container>
    </PageContent>
  );
};

export default FavoritesClient;
