"use client";

import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { BsGithub } from "react-icons/bs";
import { FcGoogle } from "react-icons/fc";

export function AuthButtons() {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams?.get("from") ?? "/";

  return (
    <div className="w-full space-y-4 mt-12">
      <button
        className="rounded-lg w-full py-4 font-bold bg-black text-white items-stretch capitalize flex  gap-3 justify-center hover:opacity-90 transition-opacity"
        onClick={() => signIn("github", { callbackUrl })}
      >
        <BsGithub className="w-5 h-5" />
        Sign In With Github
      </button>

      <button
        className="rounded-lg w-full py-4 font-bold bg-[#eee] text-black items-center capitalize flex  gap-3 justify-center hover:opacity-90 transition-opacity"
        onClick={() => signIn("google", { callbackUrl })}
      >
        <FcGoogle className="w-5 h-5" />
        Sign In Google
      </button>
    </div>
  );
}
