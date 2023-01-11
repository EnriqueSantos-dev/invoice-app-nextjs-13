import { prisma } from "@/lib/prisma";
import { Invoice, StatusInvoice } from "@/app/types";

type GetInvoiceByIdProps = {
  invoiceId: string;
};

type GetInvoiceByIdResponse = Invoice | null;

export default async function dbGetInvoiceById({
  invoiceId,
}: GetInvoiceByIdProps): Promise<GetInvoiceByIdResponse> {
  const invoice = await prisma.invoice.findUnique({
    where: {
      id: invoiceId,
    },
    include: {
      customer: {
        select: {
          id: true,
          name: true,
          email: true,
          address: true,
        },
      },
      ownerAddress: true,
      items: true,
    },
  });

  if (!invoice) return null;

  return {
    ...invoice,
    createdAt: invoice.createdAt.toISOString(),
    paymentDate: invoice.paymentDate.toISOString(),
    status: invoice.status as StatusInvoice,
  };
}
