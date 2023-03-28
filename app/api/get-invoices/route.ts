import dbGetInvoices from "@/app/lib/prisma/db-get-invoices";
import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";

export async function GET() {
  const session = await getServerSession(authOptions);
  const invoices = await dbGetInvoices({ userId: session?.user.id! });

  return new Response(JSON.stringify(invoices));
}
