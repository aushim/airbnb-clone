import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";
import getCurrentUser from "@/app/actions/getCurrentUser";
import { ImageUploadResult } from "@/app/components/inputs/ImageUpload";

export async function POST(request: Request) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }

  const body = await request.json();
  const {
    title,
    description,
    price,
    locationLabel,
    locationValue,
    locationLatLng,
    locationId,
    locationCountry,
    photos,
    categories,
    roomCount,
    bathroomCount,
    guestCount,
  } = body;

  const listing = await prisma.listing.create({
    data: {
      title,
      description,
      price: parseInt(price, 10),
      locationLabel,
      locationLatLng,
      locationId,
      locationCountry,
      locationValue,
      photos: {
        create: photos.map((photo: ImageUploadResult) => ({
          url: photo.url,
          etag: photo.etag,
        })),
      },
      categories,
      roomCount,
      bathroomCount,
      guestCount,
      userId: currentUser.id,
    },
    include: {
      photos: true,
    },
  });

  return NextResponse.json(listing);
}
