import type { NextApiRequest, NextApiResponse } from "next";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { unstable_getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]";

const allowedMethods = ["PATCH"];

const schema = z.object({
  id: z.string().uuid(),
  invoice: z.object({
    description: z.string().min(1).max(255),
    paymentDate: z.string().datetime(),
    customer: z.object({
      email: z.string().email(),
      name: z.string().min(1).max(255),
      city: z.string().min(1).max(255),
      country: z.string().min(1).max(255),
      zipCode: z
        .string()
        .regex(/^\d{5}(?:[-\s]\d{4})?$/, { message: "Invalid zip code" }),
      streetAddress: z.string().min(1).max(255),
    }),
    ownerAddress: z.object({
      city: z.string().min(1).max(255),
      country: z.string().min(1).max(255),
      zipCode: z.string().regex(/^\d{5}(?:[-\s]\d{4})?$/, {
        message: "Invalid zip code",
      }),
      streetAddress: z.string().min(1).max(255),
    }),
    status: z.enum(["DRAFT", "PENDING", "PAID"]),
    items: z.array(
      z.object({
        id: z.optional(z.number()),
        name: z.string().min(1).max(255),
        price: z.number().min(0),
        quantity: z.number().min(0),
        invoiceId: z.optional(z.string().uuid()),
      })
    ),
  }),
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
    const { id, invoice: rawInvoice } = schema.parse({
      id: req.query.id,
      invoice: req.body.invoice,
    });

    const { email, name, ...restRawCustomer } = rawInvoice.customer;

    await prisma.invoice.update({
      where: { id },
      data: {
        description: rawInvoice.description,
        paymentDate: rawInvoice.paymentDate,
        customer: {
          create: {
            email,
            name,
            address: {
              create: {
                ...restRawCustomer,
              },
            },
          },
        },
        ownerAddress: {
          create: {
            ...rawInvoice.ownerAddress,
          },
        },
        status: rawInvoice.status,
      },
    });

    await prisma.invoiceItems.deleteMany({
      where: {
        invoiceId: id,
      },
    });

    await prisma.$transaction(
      rawInvoice.items.map((item) =>
        prisma.invoiceItems.create({
          data: {
            name: item.name,
            price: item.price,
            quantity: item.quantity,
            invoiceId: id,
          },
        })
      )
    );

    return res.status(200).json({ message: "Invoice updated" });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ message: error.message });
    }

    return res.status(500).json({ message: "Internal server error" });
  }
}
