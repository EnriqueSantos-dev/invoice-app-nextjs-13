"use client";

import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { BsGithub } from "react-icons/bs";
import { FcGoogle } from "react-icons/fc";

export function AuthButtons() {
	const searchParams = useSearchParams();
	const callbackUrl = searchParams?.get("from") ?? "/";

	return (
		<div className="mt-12 w-full space-y-4">
			<button
				className="flex w-full items-stretch justify-center gap-3 rounded-lg bg-black py-4 font-bold  capitalize text-white transition-opacity hover:opacity-90"
				onClick={() => signIn("github", { callbackUrl })}
			>
				<BsGithub className="h-5 w-5" />
				Sign In With Github
			</button>

			<button
				className="flex w-full items-center justify-center gap-3 rounded-lg bg-[#eee] py-4 font-bold  capitalize text-black transition-opacity hover:opacity-90"
				onClick={() => signIn("google", { callbackUrl })}
			>
				<FcGoogle className="h-5 w-5" />
				Sign In Google
			</button>
		</div>
	);
}
