import React from "react";

export default async function Layout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<main className="relative inset-0 h-screen bg-offWhite px-6 md:px-0">
			{children}
		</main>
	);
}
