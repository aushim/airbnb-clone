"use client";

import { useCallback } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import { signOut } from "next-auth/react";

import Avatar from "@/app/components/Avatar";
import MenuItem from "@/app/components/navbar/MenuItem";
import useMenu from "@/app/hooks/useMenu";
import useRentModal from "@/app/hooks/useRentModal";
import useLoginModal from "@/app/hooks/useLoginModal";
import useRegisterModal from "@/app/hooks/useRegisterModal";
import { SerializedUser } from "@/app/types";
import { useRouter } from "next/navigation";

interface UserMenuProps {
  currentUser?: SerializedUser | null;
}

const UserMenu: React.FC<UserMenuProps> = ({ currentUser }) => {
  const router = useRouter();

  const menu = useMenu();

  const rentModal = useRentModal();
  const loginModal = useLoginModal();
  const registerModal = useRegisterModal();

  const toggleOpenMenu = useCallback(() => {
    menu.isOpen ? menu.onClose() : menu.onOpen();
  }, [menu]);

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
          className="hidden cursor-pointer rounded-full px-4 py-3 text-sm font-semibold transition hover:bg-neutral-100 lg:block"
        >
          List new property
        </div>
        <div
          onClick={toggleOpenMenu}
          className="flex cursor-pointer flex-row items-center gap-3 rounded-full border border-neutral-200 p-4 transition hover:shadow-md md:px-2 md:py-1"
        >
          <AiOutlineMenu />
          <div className="hidden md:block">
            <Avatar src={currentUser?.image} />
          </div>
        </div>
      </div>

      {menu.isOpen && (
        <div className="absolute right-0 top-12 w-[40vw] overflow-hidden rounded-xl bg-white text-sm shadow-md lg:w-3/4">
          <div className="flex cursor-pointer flex-col">
            {currentUser ? (
              <>
                <div className="cursor-default px-4 py-3 text-lg font-bold">
                  Hello {currentUser.name?.split(" ")[0]}!
                </div>
                <hr />
                <div className="text-md cursor-default px-4 py-3 font-semibold text-rose-500">
                  Browse as guest
                </div>
                <MenuItem
                  onClick={() => router.push("/trips")}
                  label="My trips"
                />
                <MenuItem
                  onClick={() => router.push("/favorites")}
                  label="My favorites"
                />
                <hr />
                <div className="text-md cursor-default px-4 py-3 font-semibold text-rose-500">
                  Browse as host
                </div>
                <MenuItem
                  onClick={() => router.push("/properties")}
                  label="My properties"
                />
                <MenuItem
                  onClick={() => router.push("/reservations")}
                  label="My reservations"
                />
                <MenuItem
                  onClick={() => rentModal.onOpen()}
                  label="List new property"
                />
                <hr />
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
