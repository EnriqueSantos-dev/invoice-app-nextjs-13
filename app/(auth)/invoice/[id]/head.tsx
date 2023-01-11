import dbGetInvoiceById from "@/app/lib/prisma/db-get-invoice-by-id";

export default async function Head({ params }: { params: { id: string } }) {
  const invoice = await dbGetInvoiceById({ invoiceId: params.id });
  const title = `Invoice - #${invoice?.shortId.toUpperCase()}`;

  return (
    <>
      <title>{title}</title>
      <meta content="width=device-width, initial-scale=1" name="viewport" />
      <meta
        name="description"
        content="View your invoice with ID and manage it"
      />
      <meta name="keywords" content="invoice, ID" />
      <meta name="author" content="Enrique Santos" />
      <link rel="icon" href="/assets/favicon.png" />
    </>
  );
}
