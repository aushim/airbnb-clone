"use client";

import { useCallback, useRef, useEffect, RefObject } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import { signOut } from "next-auth/react";
import { useTranslations } from "next-intl";
import { useRouter } from "next-intl/client";
import { usePathname } from "next-intl/client";

import Avatar from "@/app/components/Avatar";
import MenuItem from "@/app/components/navbar/MenuItem";
import useUserMenu from "@/app/hooks/useUserMenu";
import useLangMenu from "@/app/hooks/useLangMenu";
import useRentModal from "@/app/hooks/useRentModal";
import useLoginModal from "@/app/hooks/useLoginModal";
import useRegisterModal from "@/app/hooks/useRegisterModal";
import { SerializedUser } from "@/app/types";
import { BiGlobe } from "react-icons/bi";

interface MenuProps {
  currentUser?: SerializedUser | null;
}

const Menu: React.FC<MenuProps> = ({ currentUser }) => {
  const t = useTranslations("Menu");
  const router = useRouter();
  const pathname = usePathname();
  const langMenu = useLangMenu();
  const userMenu = useUserMenu();
  const rentModal = useRentModal();
  const loginModal = useLoginModal();
  const registerModal = useRegisterModal();

  const useOutsideAlerter = (
    ref: RefObject<HTMLDivElement>,
    toggleRef?: RefObject<HTMLDivElement>,
  ) => {
    useEffect(() => {
      const handleClickOutside = (event: Event) => {
        if (ref.current && !ref.current.contains(event.target as Node)) {
          if (
            !toggleRef ||
            !toggleRef?.current?.contains(event.target as Node)
          ) {
            langMenu.onClose();
            userMenu.onClose();
          }
        }
      };
      // Bind the event listener
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        // Unbind the event listener on clean up
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [ref, toggleRef]);
  };

  const langMenuRef = useRef<HTMLDivElement>(null);
  const langMenuToggleRef = useRef<HTMLDivElement>(null);
  const userMenuRef = useRef<HTMLDivElement>(null);
  const userMenuToggleRef = useRef<HTMLDivElement>(null);
  useOutsideAlerter(langMenuRef, langMenuToggleRef);
  useOutsideAlerter(userMenuRef, userMenuToggleRef);

  const toggleOpenLangMenu = useCallback(() => {
    if (langMenu.isOpen) {
      langMenu.onClose();
    } else {
      langMenu.onOpen();
      userMenu.onClose();
    }
  }, [langMenu, userMenu]);

  const toggleOpenUserMenu = useCallback(() => {
    if (userMenu.isOpen) {
      userMenu.onClose();
    } else {
      userMenu.onOpen();
      langMenu.onClose();
    }
  }, [userMenu, langMenu]);

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
          {t("listPropertyLabel")}
        </div>
        <div
          ref={langMenuToggleRef}
          onClick={toggleOpenLangMenu}
          className="cursor-pointer px-4"
        >
          <BiGlobe size={20} />
        </div>
        <div
          ref={userMenuToggleRef}
          onClick={toggleOpenUserMenu}
          className="flex cursor-pointer flex-row items-center gap-3 rounded-full border border-neutral-200 p-4 transition hover:shadow-md md:px-2 md:py-1"
        >
          <AiOutlineMenu />
          <div className="hidden md:block">
            <Avatar src={currentUser?.image} />
          </div>
        </div>
      </div>

      {langMenu.isOpen && (
        <div
          ref={langMenuRef}
          className="absolute end-20 top-12 w-min overflow-hidden rounded-xl bg-white text-sm shadow-md"
        >
          <div className="flex cursor-pointer flex-col">
            <MenuItem
              onClick={() => router.push(pathname, { locale: "en" })}
              imageSrc="/images/flags/en.png"
              label="English"
            />
            <MenuItem
              onClick={() => router.push(pathname, { locale: "zh" })}
              imageSrc="/images/flags/zh.png"
              label="官话"
            />
            <MenuItem
              onClick={() => router.push(pathname, { locale: "hi" })}
              imageSrc="/images/flags/hi.png"
              label="हिन्दी"
            />
            <MenuItem
              onClick={() => router.push(pathname, { locale: "es" })}
              imageSrc="/images/flags/es.png"
              label="Español"
            />
            <MenuItem
              onClick={() => router.push(pathname, { locale: "fr" })}
              imageSrc="/images/flags/fr.png"
              label="Français"
            />
            <MenuItem
              onClick={() => router.push(pathname, { locale: "ar" })}
              imageSrc="/images/flags/ar.png"
              label="اَلْعَرَبِيَّةُ"
            />
            <MenuItem
              onClick={() => router.push(pathname, { locale: "he" })}
              imageSrc="/images/flags/he.png"
              label="עִבְרִית"
            />
          </div>
        </div>
      )}

      {userMenu.isOpen && (
        <div
          ref={userMenuRef}
          className="absolute end-0 top-12 w-[50vw] overflow-hidden rounded-xl bg-white text-sm shadow-md lg:w-3/4"
        >
          <div className="flex cursor-pointer flex-col">
            {currentUser ? (
              <>
                <div className="cursor-default px-4 py-3 font-bold">
                  {currentUser.name}
                </div>
                <hr />
                <div className="text-md cursor-default px-4 py-3 font-semibold">
                  {t("guestOptionsLabel")}
                </div>
                <MenuItem
                  onClick={() => router.push("/trips")}
                  label={t("tripsLabel")}
                />
                <MenuItem
                  onClick={() => router.push("/favorites")}
                  label={t("favoritesLabel")}
                />
                <hr />
                <div className="text-md cursor-default px-4 py-3 font-semibold">
                  {t("hostOptionsLabel")}
                </div>
                <MenuItem
                  onClick={() => router.push("/properties")}
                  label={t("propertiesLabel")}
                />
                <MenuItem
                  onClick={() => router.push("/reservations")}
                  label={t("reservationsLabel")}
                />
                <MenuItem
                  onClick={() => rentModal.onOpen()}
                  label={t("listPropertyLabel")}
                />
                <hr />
                <MenuItem
                  onClick={() => signOut()}
                  label={t("logout")}
                />
              </>
            ) : (
              <>
                <MenuItem
                  onClick={loginModal.onOpen}
                  label={t("login")}
                />
                <MenuItem
                  onClick={registerModal.onOpen}
                  label={t("register")}
                />
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Menu;
