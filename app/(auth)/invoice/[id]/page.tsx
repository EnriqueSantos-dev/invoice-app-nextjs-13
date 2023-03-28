import dbGetInvoiceById from "@/lib/prisma/db-get-invoice-by-id";
import Controller from "../components/Controller";
import { notFound } from "next/navigation";

type PageProps = {
  params: { id: string };
};

export async function generateMetadata({ params }: { params: { id: string } }) {
  const id = params.id;
  const invoice = await dbGetInvoiceById({ invoiceId: id });

  return {
    title: `Invoice | #${invoice?.shortId.toUpperCase()}`,
    description: "View your invoice with ID and manage it",
  };
}

async function getData(id: string) {
  const invoice = await dbGetInvoiceById({ invoiceId: id });

  if (!invoice) notFound();

  return invoice;
}

export default async function Page({ params: { id } }: PageProps) {
  const invoice = await getData(id);

  return <Controller initialData={invoice} />;
}
