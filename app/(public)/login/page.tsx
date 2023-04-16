import { AuthButtons, Logo } from "@/app/components";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login",
  description: "Login page for used invoice app",
};

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

      <AuthButtons />
    </div>
  );
}
