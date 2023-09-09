import prisma from "@/app/libs/prismadb";
import getCurrentUser from "@/app/actions/getCurrentUser";

export default async function getFavoriteListings() {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      return [];
    }

    const favorites = await prisma.listing.findMany({
      where: {
        id: {
          in: [...(currentUser.favoriteIds || [])],
        },
      },
      include: {
        photos: true,
      },
    });

    const serializedFavorites = favorites.map((favorite) => ({
      ...favorite,
      createdAt: favorite.createdAt.toISOString(),
      photos: favorite.photos.map((photo) => ({
        ...photo,
        createdAt: photo.createdAt.toISOString(),
      })),
    }));

    return serializedFavorites;
  } catch (error) {
    throw new Error();
  }
}
