import prisma from "@/app/libs/prismadb";

export interface IListingsParams {
  userId?: string;
  guestCount?: number;
  roomCount?: number;
  bathroomCount?: number;
  startDate?: string;
  endDate?: string;
  locationValue?: string;
  category?: string;
}

export default async function getListings(params: IListingsParams) {
  try {
    const {
      userId,
      guestCount,
      roomCount,
      bathroomCount,
      startDate,
      endDate,
      locationValue,
      category,
    } = params;

    let query: any = {};

    if (userId) {
      query.userId = userId;
    }

    if (category) {
      query.categories = {
        has: category,
      };
    }

    if (roomCount) {
      query.roomCount = {
        gte: +roomCount,
      };
    }

    if (guestCount) {
      query.guestCount = {
        gte: +guestCount,
      };
    }

    if (bathroomCount) {
      query.bathroomCount = {
        gte: +bathroomCount,
      };
    }

    if (locationValue) {
      query.locationValue = locationValue;
    }

    if (startDate && endDate) {
      query.NOT = {
        reservations: {
          some: {
            OR: [
              {
                startDate: {
                  lte: startDate,
                },
                endDate: {
                  gte: startDate,
                },
              },
              {
                startDate: {
                  lte: endDate,
                },
                endDate: {
                  gte: endDate,
                },
              },
              {
                startDate: {
                  gte: startDate,
                },
                endDate: {
                  lte: endDate,
                },
              },
            ],
          },
        },
      };
    }

    const listings = await prisma.listing.findMany({
      where: query,
      orderBy: { createdAt: "desc" },
      include: {
        photos: true,
      },
    });

    const serializedListings = listings.map((listing) => ({
      ...listing,
      createdAt: listing.createdAt.toISOString(),
      photos: listing.photos.map((photo) => ({
        ...photo,
        createdAt: photo.createdAt.toISOString(),
      })),
    }));

    return serializedListings;
  } catch (error) {
    throw new Error();
  }
}
