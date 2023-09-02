"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

const Logo = () => {
  const router = useRouter();
  return (
    <div>
      <Image
        alt="Logo"
        height="100"
        width="100"
        className="hidden cursor-pointer md:block"
        src="/images/logo.png"
      />
    </div>
  );
};

export default Logo;
