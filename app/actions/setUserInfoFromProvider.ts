import { Account, Profile } from "next-auth";
import { GithubProfile } from "next-auth/providers/github";
import { GoogleProfile } from "next-auth/providers/google";
import prisma from "@/app/libs/prismadb";

interface SetUserInfoFromProviderProps {
  email: string | null | undefined;
  account: Account | null;
  profile: Profile | undefined;
}

export default async function setUserInfoFromProvider({
  email,
  account,
  profile,
}: SetUserInfoFromProviderProps) {
  try {
    if (account?.provider !== "credentials" && email) {
      const userRecord = await prisma.user.findUnique({
        where: { email },
      });

      const imageUri =
        account?.provider === "github"
          ? (profile as GithubProfile).avatar_url
          : account?.provider === "google"
          ? (profile as GoogleProfile).picture
          : null;

      const profileName = profile?.name as string;

      // Set user image from provider if user doesn't have one
      if (userRecord && !userRecord.image && imageUri) {
        await prisma.user.update({
          where: { email },
          data: { image: imageUri },
        });
      }

      // Set user name from provider if user doesn't have one or if provider name is longer
      if (
        userRecord &&
        profileName &&
        (!userRecord.name || userRecord.name.length < profileName.length)
      ) {
        await prisma.user.update({
          where: { email },
          data: { name: profileName },
        });
      }
    }
  } catch (error) {}
}
