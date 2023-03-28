import dbGetInvoicesCount from "@/app/lib/prisma/db-get-invoices-count";
import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";

export async function GET() {
  const session = await getServerSession(authOptions);
  const userId = session?.user?.id as string;

  try {
    const count = await dbGetInvoicesCount({ userId });
    return new Response(JSON.stringify(count));
  } catch (e) {
    return new Response(JSON.stringify({ error: e }), { status: 500 });
  }
}
