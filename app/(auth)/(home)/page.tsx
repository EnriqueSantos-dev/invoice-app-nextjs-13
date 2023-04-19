import { ActiveBar, InvoiceItemSkeleton } from "@/app/components";
import dbGetInvoicesCount from "@/lib/prisma/db-get-invoices-count";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { Metadata } from "next";
import { getServerSession } from "next-auth";
import { Suspense } from "react";
import ControllerListInvoices from "./components/ControllerListInvoices";
import ErrorBoundaryFallback from "./components/ErrorBoundaryInvoices";

export const metadata: Metadata = {
	title: "Home",
	description: "Invoice App. Challenge from frontend mentor",
	authors: [
		{
			name: "Enrique Santos",
			url: "https://github.com/enriquesantos-dev",
		},
	],
};

async function getData() {
	const session = await getServerSession(authOptions);
	const data = await dbGetInvoicesCount({ userId: session?.user.id! });
	return data;
}

export default async function Home() {
	const { count } = await getData();

	return (
		<div className="container h-[calc(100vh_-_72px)] pt-8 md:h-screen md:pt-10">
			<div className="relative flex h-full flex-col">
				<ActiveBar count={count} />
				<div className="relative mt-12 flex-1 overflow-y-auto rounded-t-lg scrollbar-hide">
					<div className="absolute inset-x-0 top-0 z-0 grid h-auto grid-flow-row gap-6 px-1 pb-4 pt-2">
						<Suspense
							fallback={Array.from({ length: 8 }).map((_, index) => (
								<InvoiceItemSkeleton key={index} />
							))}
						>
							<ErrorBoundaryFallback>
								<ControllerListInvoices />
							</ErrorBoundaryFallback>
						</Suspense>
					</div>
				</div>
			</div>
		</div>
	);
}
