"use client";

import Image from "next/image";

const Logo = () => {
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
