import z from "zod";
import { Status } from "@/app/types";
import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/lib/prisma";
import { unstable_getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]";

const allowedMethods = ["PATCH"];

const schema = z.object({
  id: z.string().uuid(),
  status: z.nativeEnum(Status),
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
    const { status, id } = schema.parse({
      status: req.body.status,
      id: req.query.id,
    });

    await prisma.invoice.update({
      where: {
        id,
      },
      data: {
        status: status,
      },
    });

    res.status(200).json({ message: "Invoice updated" });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: error.issues });
    }

    return res.status(500).json({ error: "Internal server error" });
  }
}
