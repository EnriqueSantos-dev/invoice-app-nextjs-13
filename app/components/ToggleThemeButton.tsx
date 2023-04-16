"use client";

import { useMemo } from "react";
import { BsFillSunFill, BsFillMoonFill } from "react-icons/bs";
import useToggleTheme from "@/app/hooks/useToggleTheme";

export function ToggleThemeButton() {
  const { theme, toggleTheme } = useToggleTheme();

  const IconShow = useMemo(
    () => (theme === "dark" ? BsFillSunFill : BsFillMoonFill),
    [theme]
  );

  return (
    <button
      type="button"
      title="button toggle theme. Dark and light"
      className="group h-full border-0 flex justify-center items-center px-6 lg:h-auto lg:py-6 outline-none lg:w-full"
      onClick={toggleTheme}
    >
      <IconShow className="h-4 w-4 fill-baliHai transition-colors duration-150 group-hover:fill-offWhite" />
    </button>
  );
}
