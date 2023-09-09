import { Listing, Reservation, User, Photo } from "@prisma/client";

export type SerializedListing = Omit<Listing, "createdAt"> & {
  photos: SerializedPhoto[];
  createdAt: string;
};

export type SerializedPhoto = Omit<Photo, "createdAt" | "listing"> & {
  createdAt: string;
};

export type SerializedReservation = Omit<
  Reservation,
  "createdAt" | "startDate" | "endDate" | "listing"
> & {
  createdAt: string;
  startDate: string;
  endDate: string;
  listing: SerializedListing;
};

export type SerializedUser = Omit<
  User,
  "createdAt" | "updatedAt" | "emailVerified"
> & {
  createdAt: string;
  updatedAt: string;
  emailVerified: string | null;
};
