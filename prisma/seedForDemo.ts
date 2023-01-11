import { prisma } from "@/lib/prisma";
import faker from "@faker-js/faker";
import { Prisma } from "@prisma/client";
import ShortUniqueId from "short-unique-id";

const invoices: Omit<Prisma.InvoiceCreateInput, "user">[] = Array.from({
  length: 16,
}).map(() => ({
  shortId: new ShortUniqueId().randomUUID(6),
  customer: {
    create: {
      email: faker.faker.internet.email(),
      name: faker.faker.name.fullName(),
      address: {
        create: {
          city: faker.faker.address.city(),
          country: faker.faker.address.country(),
          zipCode: faker.faker.address.zipCode(),
          streetAddress: faker.faker.address.streetAddress(),
        },
      },
    },
  },
  description: faker.faker.lorem.paragraph(),
  ownerAddress: {
    create: {
      city: faker.faker.address.city(),
      country: faker.faker.address.country(),
      zipCode: faker.faker.address.zipCode(),
      streetAddress: faker.faker.address.streetAddress(),
    },
  },
  paymentDate: faker.faker.date.future(),
  items: {
    createMany: {
      data: [
        {
          name: faker.faker.name.fullName(),
          price: Math.max(Math.random() * 100),
          quantity: 1,
        },
      ],
    },
  },
  status: "DRAFT",
}));

export const main = async (userId: string) => {
  await prisma.$transaction(
    invoices.map((invoice) =>
      prisma.invoice.create({
        data: {
          user: {
            connect: {
              id: userId,
            },
          },
          ...invoice,
        },
      })
    )
  );
};
