import dbGetInvoiceById from "@/lib/prisma/db-get-invoice-by-id";
import { Controller } from "../components/Controller";
import { notFound } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/utils";
import { Metadata } from "next";

type PageProps = {
	params: { id: string };
};

export async function generateMetadata({
	params,
}: {
	params: { id: string };
}): Promise<Metadata> {
	const session = await getServerSession(authOptions);
	const userId = session?.user?.id as string;
	const id = params.id;

	const invoice = await dbGetInvoiceById({ invoiceId: id, userId });

	return {
		title: `#${invoice?.shortId.toUpperCase()}`,
		description: "View your invoice with ID and manage it",
	};
}

async function getData(id: string) {
	const session = await getServerSession(authOptions);
	const userId = session?.user?.id as string;

	const invoice = await dbGetInvoiceById({ invoiceId: id, userId });

	if (!invoice) notFound();

	return invoice;
}

export default async function Page({ params: { id } }: PageProps) {
	const invoice = await getData(id);

	return <Controller initialData={invoice} />;
}
