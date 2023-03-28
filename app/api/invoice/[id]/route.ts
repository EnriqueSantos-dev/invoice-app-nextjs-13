import { prisma } from "@/lib/prisma";
import dbGetInvoiceById from "@/app/lib/prisma/db-get-invoice-by-id";
import { Status } from "@/app/types";
import { z } from "zod";

interface Params {
  params: {
    id: string;
  };
}

export async function GET(req: Request, { params }: Params): Promise<Response> {
  const schema = z.object({
    id: z.string().uuid(),
  });

  try {
    const { id: invoiceId } = schema.parse({ id: params.id });
    const invoice = await dbGetInvoiceById({ invoiceId });

    return new Response(JSON.stringify(invoice));
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(JSON.stringify({ error: error.issues }), {
        status: 400,
      });
    }

    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
    });
  }
}

export async function PATCH(
  req: Request,
  { params }: Params
): Promise<Response> {
  const body = await req.json();

  const schema = z.object({
    id: z.string().uuid(),
    status: z.nativeEnum(Status),
  });

  try {
    const { status, id } = schema.parse({ ...body, id: params.id });

    await prisma.invoice.update({
      where: {
        id,
      },
      data: {
        status: status,
      },
    });

    return new Response(JSON.stringify({ message: "Invoice updated" }));
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(JSON.stringify({ error: error.issues }), {
        status: 400,
      });
    }

    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
    });
  }
}

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

export async function PUT(req: Request, { params }: Params): Promise<Response> {
  const body = await req.json();

  try {
    const { id, invoice: rawInvoice } = schema.parse({
      id: params.id,
      invoice: await body?.invoice,
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

    return new Response(JSON.stringify({ message: "Invoice updated" }));
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(JSON.stringify({ message: error.message }), {
        status: 400,
      });
    }

    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
    });
  }
}

export async function DELETE(
  req: Request,
  { params }: Params
): Promise<Response> {
  try {
    await prisma.invoice.delete({
      where: {
        id: params.id,
      },
    });

    return new Response(JSON.stringify({ message: "Invoice deleted" }));
  } catch (error) {
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
    });
  }
}
