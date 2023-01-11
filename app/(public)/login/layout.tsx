import React from "react";
import { unstable_getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { redirect } from "next/navigation";

async function getData() {
  const session = await unstable_getServerSession(authOptions);
  if (session) redirect("/");
  return session;
}

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  await getData();

  return (
    <main className="relative h-screen inset-0 bg-offWhite">{children}</main>
  );
}
