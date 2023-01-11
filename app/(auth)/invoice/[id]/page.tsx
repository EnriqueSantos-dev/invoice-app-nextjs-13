import dbGetInvoices from "@/lib/prisma/db-get-invoices";
import dbGetInvoiceById from "@/lib/prisma/db-get-invoice-by-id";
import Controller from "../components/Controller";
import { notFound } from "next/navigation";

type PageProps = {
  params: { id: string };
};

export async function getStaticParams() {
  const invoices = await dbGetInvoices({});
  const params = invoices.invoices.map((invoice) => ({ id: invoice.id }));
  return params;
}

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
