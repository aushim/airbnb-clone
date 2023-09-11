"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

const Logo = () => {
  const router = useRouter();

  return (
    <div>
      <Image
        onClick={() => router.push("/")}
        alt="Logo"
        height="40"
        width="40"
        className="h-auto w-auto shrink-0 cursor-pointer sm:hidden"
        src="/images/logo-icon.png"
        priority
      />
      <Image
        onClick={() => router.push("/")}
        alt="Logo"
        height="100"
        width="100"
        className="hidden h-auto w-auto cursor-pointer sm:block"
        src="/images/logo.png"
        priority
      />
    </div>
  );
};

export default Logo;
