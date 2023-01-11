import z from "zod";
import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/lib/prisma";
import { authOptions } from "./auth/[...nextauth]";
import { unstable_getServerSession } from "next-auth";

type DataResponse =
  | {
      message: string;
    }
  | {
      errors: z.ZodIssue[];
    };

const allowedMethods = ["POST"];

const schema = z.object({
  invoice: z.object({
    shortId: z.string().min(1).max(6),
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
      })
    ),
  }),
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<DataResponse>
) {
  const method = req.method;
  const session = await unstable_getServerSession(req, res, authOptions);

  if (!session) {
    return res.status(401).send({ message: "Unauthorized" });
  }

  if (!allowedMethods.includes(method!)) {
    return res.status(405).json({ message: "Method not allowed" });
  }

  if (method === "POST") {
    try {
      const { invoice: rawInvoice } = schema.parse({
        invoice: req.body.invoice,
      });

      const { email, name, ...restRawCustomer } = rawInvoice.customer;

      await prisma.invoice.create({
        data: {
          user: {
            connect: {
              id: session.user.id!,
            },
          },
          shortId: rawInvoice.shortId,
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
          items: {
            createMany: {
              data: rawInvoice.items,
            },
          },
        },
      });

      res.status(201).json({ message: "Invoice created" });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ errors: error.errors });
      }
      res.status(500).json({ message: "Internal server error" });
    }
  }
}
