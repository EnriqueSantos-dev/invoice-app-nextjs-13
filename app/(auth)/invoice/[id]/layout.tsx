export const fetchCache = "force-no-store";

export default async function Layout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<div className="container h-full pb-24 pt-8 md:min-h-screen md:pt-10">
			{children}
		</div>
	);
}
