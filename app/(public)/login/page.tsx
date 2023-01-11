"use client";

import React from "react";
import Logo from "@/app/components/Logo";
import { BsGithub } from "react-icons/bs";
import { FcGoogle } from "react-icons/fc";
import { signIn } from "next-auth/react";

export default function LoginPage() {
  return (
    <div className="absolute left-1/2 mx-auto max-w-lg rounded-lg shadow-md w-full bg-whisper px-8 py-12 top-1/2 -translate-y-1/2 -translate-x-1/2">
      <div className="space-x-6 flex items-center justify-center">
        <div className="w-14 h-14 rounded-full overflow-hidden">
          <Logo />
        </div>
        <h1 className="text-4xl text-vulcan font-bold">Invoice App</h1>
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
