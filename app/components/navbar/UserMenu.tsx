"use client";

import { useCallback, useState } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import { signOut } from "next-auth/react";

import Avatar from "@/app/components/Avatar";
import MenuItem from "@/app/components/navbar/MenuItem";
import useRentModal from "@/app/hooks/useRentModal";
import useLoginModal from "@/app/hooks/useLoginModal";
import useRegisterModal from "@/app/hooks/useRegisterModal";
import { SerializedUser } from "@/app/types";

interface UserMenuProps {
  currentUser?: SerializedUser | null;
}

const UserMenu: React.FC<UserMenuProps> = ({ currentUser }) => {
  const rentModal = useRentModal();
  const loginModal = useLoginModal();
  const registerModal = useRegisterModal();

  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  const onRent = useCallback(() => {
    if (!currentUser) {
      return loginModal.onOpen();
    }

    rentModal.onOpen();
  }, [currentUser, loginModal, rentModal]);

  return (
    <div className="relative">
      <div className="flex flex-row items-center gap-3">
        <div
          onClick={onRent}
          className="hidden cursor-pointer rounded-full px-4 py-3 text-sm font-semibold transition hover:bg-neutral-100 md:block"
        >
          Airbnb your home
        </div>
        <div
          onClick={toggleOpen}
          className="flex cursor-pointer flex-row items-center gap-3 rounded-full border border-neutral-200 p-4 transition hover:shadow-md md:px-2 md:py-1"
        >
          <AiOutlineMenu />
          <div className="hidden md:block">
            <Avatar src={currentUser?.image} />
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="absolute right-0 top-12 w-[40vw] overflow-hidden rounded-xl bg-white text-sm shadow-md md:w-3/4">
          <div className="flex cursor-pointer flex-col">
            {currentUser ? (
              <>
                <MenuItem
                  onClick={() => {}}
                  label="My trips"
                />
                <MenuItem
                  onClick={() => {}}
                  label="My favourites"
                />
                <MenuItem
                  onClick={() => {}}
                  label="My reservations"
                />
                <MenuItem
                  onClick={() => {}}
                  label="My properties"
                />
                <MenuItem
                  onClick={() => rentModal.onOpen()}
                  label="Airbnb my home"
                />
                <MenuItem
                  onClick={() => signOut()}
                  label="Logout"
                />
              </>
            ) : (
              <>
                <MenuItem
                  onClick={loginModal.onOpen}
                  label="Login"
                />
                <MenuItem
                  onClick={registerModal.onOpen}
                  label="Sign up"
                />
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default UserMenu;
