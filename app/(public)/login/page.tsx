"use client";

import React from "react";
import Logo from "@/app/components/Logo";
import { BsGithub } from "react-icons/bs";
import { FcGoogle } from "react-icons/fc";
import { signIn } from "next-auth/react";

export default function LoginPage() {
  return (
    <div className="absolute w-full left-1/2 mx-auto md:max-w-lg rounded-lg md:shadow-md md:w-full md:bg-whisper px-8 py-12 top-1/2 -translate-y-1/2 -translate-x-1/2 whitespace-nowrap">
      <div className="space-x-6 flex items-center justify-center">
        <div className="w-12 h-12 rounded-full overflow-hidden">
          <Logo />
        </div>
        <h1
          className="text-2xl text-vulcan font-bold uppercase
        "
        >
          Invoice App
        </h1>
      </div>

      <h2 className="text-vulcan text-center font-bold text-3xl mt-8">Login</h2>

      <div className="w-full space-y-4 mt-12">
        <button
          className="rounded-lg w-full py-4 font-bold bg-black text-white items-stretch capitalize flex  gap-3 justify-center hover:opacity-90 transition-opacity"
          onClick={() => signIn("github", { callbackUrl: "/" })}
        >
          <BsGithub className="w-5 h-5" />
          Sign In With Github
        </button>

        <button
          className="rounded-lg w-full py-4 font-bold bg-[#eee] text-black items-center capitalize flex  gap-3 justify-center hover:opacity-90 transition-opacity"
          onClick={() => signIn("google", { callbackUrl: "/" })}
        >
          <FcGoogle className="w-5 h-5" />
          Sign In Google
        </button>
      </div>
    </div>
  );
}
