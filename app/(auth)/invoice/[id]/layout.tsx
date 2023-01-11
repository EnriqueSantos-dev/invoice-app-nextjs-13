export const dynamicParams = true;
export const dynamic = "auto";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="container h-full pt-8 pb-24 md:min-h-screen md:pt-10">
      {children}
    </div>
  );
}
