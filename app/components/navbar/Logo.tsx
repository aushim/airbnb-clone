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
        height="100"
        width="100"
        className="hidden h-auto w-auto cursor-pointer md:block"
        src="/images/logo.png"
      />
    </div>
  );
};

export default Logo;
