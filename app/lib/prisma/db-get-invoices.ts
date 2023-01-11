import { Invoice } from "@/app/types";
import { prisma } from ".";
import { Prisma } from "@prisma/client";

type GetInvoicesProps = {
  cursor?: string;
  take?: number;
  skip?: number;
  userId?: string;
};

export type GetInvoicesResponse = {
  nextCursor: string | null | undefined;
  invoices: Invoice[];
};

export default async function dbGetInvoices({
  take = 8,
  skip = 0,
  cursor,
  userId,
}: GetInvoicesProps): Promise<GetInvoicesResponse> {
  const args: Prisma.InvoiceFindManyArgs = {
    take,
    skip,
    where: {
      userId,
    },
    orderBy: {
      createdAt: "desc",
    },
  };

  if (cursor) {
    args.cursor = {
      id: cursor,
    };
  }

  const invoices = await prisma.invoice.findMany({
    ...args,
    select: {
      id: true,
      shortId: true,
      description: true,
      createdAt: true,
      paymentDate: true,
      status: true,
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

  const invoicesMapped = invoices.map((invoice) => ({
    ...invoice,
    createdAt: invoice.createdAt.toISOString(),
    paymentDate: invoice.paymentDate.toISOString(),
    status: invoice.status,
  }));

  const nextCursor = invoices.length >= take ? invoices.at(-1)?.id : null;

  return {
    nextCursor,
    invoices: invoicesMapped,
  };
}
