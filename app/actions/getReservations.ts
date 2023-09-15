import { Prisma } from "@prisma/client";
import prisma from "@/app/libs/prismadb";

interface IParams {
  listingId?: string;
  userId?: string;
  authorId?: string;
}

export default async function getReservations(params: IParams) {
  try {
    const { listingId, userId, authorId } = params;

    const query: Prisma.ReservationWhereInput = {};

    if (listingId) {
      query.listingId = listingId;
    }

    if (userId) {
      query.userId = userId;
    }

    if (authorId) {
      query.listing = { userId: authorId };
    }

    if (!query) return [];

    const reservations = await prisma.reservation.findMany({
      where: query,
      include: {
        listing: true,
      },
      orderBy: { createdAt: "desc" },
    });

    const serializedReservations = await Promise.all(
      reservations.map(async (reservation) => {
        const listing = reservation.listing;
        const photos = await prisma.photo.findMany({
          where: {
            listingId: listing.id,
          },
        });

        return {
          ...reservation,
          createdAt: reservation.createdAt.toISOString(),
          startDate: reservation.startDate.toISOString(),
          endDate: reservation.endDate.toISOString(),
          listing: {
            ...reservation.listing,
            createdAt: reservation.listing.createdAt.toISOString(),
            photos: photos.map((photo) => ({
              ...photo,
              createdAt: photo.createdAt.toISOString(),
            })),
          },
        };
      }),
    );

    return serializedReservations;
  } catch (error) {
    return [];
  }
}
