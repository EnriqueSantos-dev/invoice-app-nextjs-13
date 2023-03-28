import dbGetInvoicesCount from "@/app/lib/prisma/db-get-invoices-count";
import { unstable_getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";

export async function GET() {
  const session = await unstable_getServerSession(authOptions);

  if (!session) return new Response("Unauthorized", { status: 401 });

  try {
    const count = await dbGetInvoicesCount({ userId: session?.user.id! });
    return new Response(JSON.stringify(count));
  } catch (e) {
    return new Response(JSON.stringify({ error: e }), { status: 500 });
  }
}
