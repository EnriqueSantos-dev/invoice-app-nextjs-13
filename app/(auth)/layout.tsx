import { Header } from "@/app/components/Header";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth";

export const fetchCache = "force-no-store";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  return (
    <>
      <Header session={session} />
      <main className="min-h-screen w-full bg-offWhite pt-[72px] transition-colors duration-300 dark:bg-mirage2 md:pb-0 lg:pl-[90px] lg:pt-0">
        {children}
      </main>
    </>
  );
}
