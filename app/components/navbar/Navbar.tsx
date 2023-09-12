"use client";

import Container from "@/app/components/Container";
import Logo from "@/app/components/navbar/Logo";
import Search from "@/app/components/navbar/Search";
import Menu from "@/app/components/navbar/Menu";
import Categories from "@/app/components/navbar/Categories";
import { SerializedUser } from "@/app/types";

interface NavbarProps {
  currentUser?: SerializedUser | null;
}

const Navbar: React.FC<NavbarProps> = ({ currentUser }) => {
  return (
    <div className="fixed z-10 w-full bg-white shadow-sm">
      <div className="border-b py-4">
        <Container>
          <div className="flex flex-row items-center justify-between gap-3 md:gap-1">
            <Logo />
            <Search />
            <Menu currentUser={currentUser} />
          </div>
        </Container>
      </div>
      <Categories />
    </div>
  );
};

export default Navbar;
