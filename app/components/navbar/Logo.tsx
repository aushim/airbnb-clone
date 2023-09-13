"use client";

import Image from "next/image";
import { useRouter } from "next-intl/client";

const Logo = () => {
  const router = useRouter();

  return (
    <div>
      <div className="relative h-10 w-10 cursor-pointer sm:hidden">
        <Image
          onClick={() => router.push("/")}
          alt="Logo"
          fill
          src="/images/logo-icon.png"
          priority
        />
      </div>
      <div className="relative hidden h-10 w-32 cursor-pointer sm:block">
        <Image
          onClick={() => router.push("/")}
          alt="Logo"
          fill
          className="h-auto w-auto"
          src="/images/logo.png"
          priority
        />
      </div>
    </div>
  );
};

export default Logo;
