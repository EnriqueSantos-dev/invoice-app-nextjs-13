export default function Loading() {
  return (
    <div className="relative inset-0 py-20 w-full h-full grid place-content-center content-center">
      <div className="flex flex-col gap-3 justify-center items-center">
        <p className="text-sm text-shipCove">Loading details...</p>
        <span className="block h-6 w-6 animate-spin rounded-full border-2 border-shipCove border-r-transparent" />
      </div>
    </div>
  );
}
