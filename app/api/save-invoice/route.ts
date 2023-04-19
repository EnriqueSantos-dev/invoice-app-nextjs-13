import z from "zod";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/utils";

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

export async function POST(req: Request) {
	const session = await getServerSession(authOptions);
	const userId = session?.user?.id as string;

	const body = await req.json();

	try {
		const { invoice: rawInvoice } = schema.parse({
			invoice: body?.invoice,
		});

		const { email, name, ...restRawCustomer } = rawInvoice.customer;

		await prisma.invoice.create({
			data: {
				user: {
					connect: {
						id: userId,
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

		return new Response(JSON.stringify({ message: "Invoice created" }), {
			status: 201,
		});
	} catch (error) {
		if (error instanceof z.ZodError) {
			return new Response(JSON.stringify({ errors: error.errors }), {
				status: 400,
			});
		}

		return new Response(JSON.stringify({ message: "Internal server error" }), {
			status: 500,
		});
	}
}
