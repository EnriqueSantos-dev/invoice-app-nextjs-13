export default function Loading() {
	return (
		<div className="relative inset-0 grid h-full w-full place-content-center content-center py-20">
			<div className="flex flex-col items-center justify-center gap-3">
				<p className="text-sm text-shipCove">Loading details...</p>
				<span className="block h-6 w-6 animate-spin rounded-full border-2 border-shipCove border-r-transparent" />
			</div>
		</div>
	);
}
