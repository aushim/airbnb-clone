import { useRouter } from "next-intl/client";
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
        let request;

        if (hasFavorited) {
          request = () =>
            fetch(`/api/favorites/${listingId}`, { method: "DELETE" });
        } else {
          request = () =>
            fetch(`/api/favorites/${listingId}`, { method: "POST" });
        }

        await request();
        router.refresh();
        toast.success("Success");
      } catch (error) {
        toast.error("Something went wrong");
      }
    },
    [listingId, currentUser, hasFavorited, router, loginModal],
  );

  return {
    hasFavorited,
    toggleFavorite,
  };
};

export default useFavorite;
