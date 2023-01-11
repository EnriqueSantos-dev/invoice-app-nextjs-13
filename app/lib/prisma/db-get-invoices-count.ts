import { prisma } from "@/lib/prisma";

type DbGetInvoicesCountProps = {
  userId: string;
};

type Response = {
  count: number;
};

export default async function dbGetInvoicesCount({
  userId,
}: DbGetInvoicesCountProps): Promise<Response> {
  const count = await prisma.invoice.count({
    where: {
      userId,
    },
  });

  return {
    count,
  };
}
