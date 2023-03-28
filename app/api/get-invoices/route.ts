import dbGetInvoices from "@/app/lib/prisma/db-get-invoices";
import { unstable_getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";

export async function GET(req: Request) {
  const session = await unstable_getServerSession(authOptions);

  if (!session) {
    return new Response(JSON.stringify({ message: "Unauthorized" }), {
      status: 401,
    });
  }

  const invoices = await dbGetInvoices({ userId: session?.user.id! });

  return new Response(JSON.stringify(invoices));
}
