import z from "zod";
import type { NextApiRequest, NextApiResponse } from "next";
import { unstable_getServerSession } from "next-auth";
import { authOptions } from "./auth/[...nextauth]";
import { Invoice } from "@/app/types";
import { Prisma } from "@prisma/client";
import { prisma } from "@/app/lib/prisma";
import dbGetInvoices from "@/app/lib/prisma/db-get-invoices";

const allowedMethods = ["GET"];

const schema = z.object({
  cursor: z.optional(z.string().uuid()),
});

type GetInvoicesResponse =
  | {
      nextCursor: string | null | undefined;
      invoices: Invoice[];
    }
  | { errors: z.ZodIssue[] }
  | { message: string }
  | string;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<GetInvoicesResponse>
) {
  const { cursor } = req.query;
  const method = req.method;
  const session = await unstable_getServerSession(req, res, authOptions);

  if (!session) {
    return res.status(401).send("Unauthorized");
  }

  if (!allowedMethods.includes(method!)) {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    const { cursor: invoiceId } = schema.parse({
      cursor,
    });

    const take = 8;
    const skip = cursor ? 1 : 0;

    const data = await dbGetInvoices({
      take,
      skip,
      cursor: invoiceId,
      userId: session?.user.id!,
    });

    return res.status(200).json({
      nextCursor: data.nextCursor,
      invoices: data.invoices,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ errors: error.errors });
    }
    return res.status(500).send("InternalServerError");
  }
}
