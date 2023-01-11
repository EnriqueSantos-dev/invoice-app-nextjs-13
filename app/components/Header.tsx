"use client";

import { useMemo } from "react";
import Image from "next/image";
import { Session } from "next-auth";
import { BsFillMoonFill, BsFillSunFill } from "react-icons/bs";
import { BiUser } from "react-icons/bi";
import useToggleTheme from "@/app/hooks/useToggleTheme";
import Logo from "./Logo";
import AvatarProfile from "./AvatarProfile";

type HeaderProps = {
  session: Session | null;
};

export default function Header({ session }: HeaderProps) {
  const { theme, toggleTheme } = useToggleTheme();

  const IconShow = useMemo(
    () => (theme === "dark" ? BsFillSunFill : BsFillMoonFill),
    [theme]
  );

  return (
    <header className="fixed top-0 left-0 z-[1000] flex h-[72px] w-full justify-between bg-ebony lg:h-full lg:w-[90px] lg:flex-col lg:rounded-tr-[20px] lg:rounded-br-[20px] lg:pb-6">
      <div className="h-full w-[72px] overflow-hidden rounded-tr-xl rounded-br-xl lg:h-[90px] lg:w-full lg:rounded-br-[20px]">
        <Logo />
      </div>

      <div className="flex flex-1 items-center justify-end px-4 lg:flex-col lg:px-0">
        <button
          type="button"
          title="button toggle theme. Dark and light"
          className="bg- group h-full border-0 px-6 lg:h-auto lg:py-6"
          onClick={toggleTheme}
        >
          <IconShow className="h-4 w-4 fill-baliHai transition-colors duration-150 group-hover:fill-offWhite" />
        </button>

        <AvatarProfile imageUrl={session?.user.image} />
      </div>
    </header>
  );
}
