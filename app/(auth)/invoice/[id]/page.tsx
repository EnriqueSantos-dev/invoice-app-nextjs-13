import dbGetInvoices from "@/lib/prisma/db-get-invoices";
import dbGetInvoiceById from "@/lib/prisma/db-get-invoice-by-id";
import Controller from "../components/Controller";
import { notFound } from "next/navigation";

type PageProps = {
  params: { id: string };
};

async function getData(id: string) {
  const invoice = await dbGetInvoiceById({ invoiceId: id });

  if (!invoice) {
    notFound();
  }

  return invoice;
}

export default async function Page({ params: { id } }: PageProps) {
  const invoice = await getData(id);

  return <Controller initialData={invoice} />;
}
