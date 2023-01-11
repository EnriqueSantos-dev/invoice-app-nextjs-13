import type { NextApiRequest, NextApiResponse } from "next";
import { z } from "zod";
import dbGetInvoiceById from "@/app/lib/prisma/db-get-invoice-by-id";
import { unstable_getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]";

const allowedMethods = ["GET"];

const schema = z.object({
  id: z.string().uuid(),
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const method = req.method ?? "";
  const session = await unstable_getServerSession(req, res, authOptions);

  if (!session) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  if (!allowedMethods.includes(method!)) {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    const { id: invoiceId } = schema.parse(req.query);

    const invoice = await dbGetInvoiceById({ invoiceId });

    return res.status(200).json(invoice);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: error.issues });
    }

    return res.status(500).json({ error: "Internal server error" });
  }
}
