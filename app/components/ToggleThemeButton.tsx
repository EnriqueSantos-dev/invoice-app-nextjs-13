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
			className="group flex h-full items-center justify-center border-0 px-6 outline-none lg:h-auto lg:w-full lg:py-6"
			onClick={toggleTheme}
		>
			<IconShow className="h-4 w-4 fill-baliHai transition-colors duration-150 group-hover:fill-offWhite" />
		</button>
	);
}
