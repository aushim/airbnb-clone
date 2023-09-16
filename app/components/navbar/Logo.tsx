"use client";

import Image from "next/image";
import Link from "next-intl/link";

const Logo = () => {
  return (
    <div>
      <Link href="/">
        <div className="relative h-10 w-10 cursor-pointer sm:hidden">
          <Image
            alt="Logo"
            fill
            src="/images/logo-icon.png"
            priority
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
        <div className="relative hidden h-10 w-32 cursor-pointer sm:block">
          <Image
            alt="Logo"
            fill
            className="h-auto w-auto"
            src="/images/logo.png"
            priority
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
      </Link>
    </div>
  );
};

export default Logo;
