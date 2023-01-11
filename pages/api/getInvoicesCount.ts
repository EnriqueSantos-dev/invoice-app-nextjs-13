import type { NextApiRequest, NextApiResponse } from "next";
import dbGetInvoicesCount from "@/app/lib/prisma/db-get-invoices-count";
import { unstable_getServerSession } from "next-auth";
import { authOptions } from "./auth/[...nextauth]";

const allowedMethods = ["GET"];

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const method = req.method ?? "";
  const session = await unstable_getServerSession(req, res, authOptions);

  if (!session) {
    return res.status(401).send("Unauthorized");
  }

  if (!allowedMethods.includes(method)) {
    return res.status(405).send("Method Not Allowed");
  }
  try {
    const count = await dbGetInvoicesCount({ userId: session?.user.id! });
    return res.status(200).json(count);
  } catch (e) {
    return res.status(500).json({ error: e });
  }
}
