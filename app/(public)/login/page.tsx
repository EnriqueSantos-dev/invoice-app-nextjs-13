import { AuthButtons, Logo } from "@/app/components";
import { Metadata } from "next";

export const metadata: Metadata = {
	title: "Login",
	description: "Login page for used invoice app",
};

export default function LoginPage() {
	return (
		<div className="absolute left-1/2 top-1/2 mx-auto w-full -translate-x-1/2 -translate-y-1/2 whitespace-nowrap rounded-lg px-8 py-12 md:w-full md:max-w-lg md:bg-whisper md:shadow-md">
			<div className="flex items-center justify-center space-x-6">
				<div className="h-12 w-12 overflow-hidden rounded-full">
					<Logo />
				</div>
				<h1
					className="text-2xl font-bold uppercase text-vulcan
        "
				>
					Invoice App
				</h1>
			</div>

			<h2 className="mt-8 text-center text-3xl font-bold text-vulcan">Login</h2>

			<AuthButtons />
		</div>
	);
}
