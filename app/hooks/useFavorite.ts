import { useRouter } from "next-intl/client";
import { useTranslations } from "next-intl";
import { useCallback, useMemo } from "react";
import { toast } from "react-hot-toast";

import { SerializedUser } from "@/app/types";

import useLoginModal from "@/app/hooks/useLoginModal";

interface IUseFavorite {
  listingId: string;
  currentUser?: SerializedUser | null;
}

const useFavorite = ({ listingId, currentUser }: IUseFavorite) => {
  const router = useRouter();
  const t = useTranslations("FavoriteButton");
  const loginModal = useLoginModal();

  const hasFavorited = useMemo(() => {
    const list = currentUser?.favoriteIds || [];
    return list.includes(listingId);
  }, [currentUser, listingId]);

  const toggleFavorite = useCallback(
    async (e: React.MouseEvent<HTMLDivElement>) => {
      e.stopPropagation();

      if (!currentUser) {
        return loginModal.onOpen();
      }

      try {
        const request = hasFavorited
          ? () => fetch(`/api/favorites/${listingId}`, { method: "DELETE" })
          : () => fetch(`/api/favorites/${listingId}`, { method: "POST" });

        await request();
        router.refresh();
      } catch (error) {
        toast.error(t("errorMessage"));
      }
    },
    [listingId, currentUser, hasFavorited, router, loginModal, t],
  );

  return {
    hasFavorited,
    toggleFavorite,
  };
};

export default useFavorite;
