"use client";
import clsx from "clsx";
import { signOut } from "next-auth/react";
import Image from "next/image";
import { useState } from "react";
import { BiUser } from "react-icons/bi";

type AvatarProfileProps = {
	imageUrl?: string;
};

export function AvatarProfile({ imageUrl }: AvatarProfileProps) {
	const [tooltipExpanded, setTooltipExpanded] = useState(false);

	function handleSignOut() {
		signOut();
	}

	function toggleTooltipExpanded() {
		setTooltipExpanded((prev) => !prev);
	}

	return (
		<div
			role="button"
			tabIndex={0}
			className="relative flex h-full items-center justify-center border-l border-darkAccent px-6 lg:h-auto lg:w-full lg:border-l-0 lg:border-t lg:px-0 lg:pt-6"
			onClick={toggleTooltipExpanded}
		>
			{imageUrl ? (
				<div className="relative h-10 w-10 lg:h-12 lg:w-12">
					<Image
						src={imageUrl}
						alt="avatar image"
						fill
						quality={100}
						className="rounded-full transition-transform hover:scale-110"
					/>
				</div>
			) : (
				<div className="relative flex h-[50px] w-[50px] items-center justify-center rounded-full bg-mirage">
					<BiUser color="#fff" fontWeight="bold" className="h-5 w-5" />
				</div>
			)}

			{/* //tooltip */}
			<button
				type="button"
				role="tooltip"
				title="button logout"
				className={clsx(
					"absolute top-1/2 z-20 origin-center -translate-y-1/2 overflow-hidden  bg-offWhite px-4 py-3 font-bold text-shipCove shadow-sm transition-all dark:bg-mirage2 dark:text-white lg:bottom-0 lg:top-auto lg:translate-y-0 lg:bg-ebony lg:text-white lg:dark:bg-ebony",
					{
						"invisible opacity-0 left-0 rounded-full lg:right-0 h-12 w-12 lg:left-1/2 lg:-translate-x-1/2":
							!tooltipExpanded,
						"visible opacity-100 -left-full rounded lg:left-auto lg:-right-[calc(100%+1.5rem)] h-fit w-fit":
							tooltipExpanded,
					}
				)}
				onClick={handleSignOut}
			>
				Logout
			</button>
		</div>
	);
}
