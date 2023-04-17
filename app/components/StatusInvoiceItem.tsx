import clsx from "clsx";
import { StatusInvoice, Status } from "@/app/types";
import { getStatusInvoiceNameFormatted } from "@/app/utils";

interface StatusInvoiceItemProps {
	status: StatusInvoice;
	isLoadingStatus?: boolean;
}

export function StatusInvoiceItem({
	status,
	isLoadingStatus,
}: StatusInvoiceItemProps) {
	const statusNameFormatted = getStatusInvoiceNameFormatted(status);

	return (
		<div
			className={clsx(
				"flex h-9 min-w-[7rem] items-center justify-center gap-2 rounded px-3 capitalize",
				{
					"bg-greenFaded text-greenColorStatusInvoice": status === Status.PAID,
					"bg-fadedOrange text-orange": status === Status.PENDING,
					"bg-bgDraftStatusLight text-otherDark dark:bg-bgDraftStatusDark dark:text-white":
						status === Status.DRAFT,
				}
			)}
		>
			{isLoadingStatus ? (
				<>
					<span className="block h-2 w-2 animate-pulse rounded-full bg-current" />
					<span className="block h-2 w-2 animate-pulse rounded-full bg-current delay-[2s]" />
					<span className="block h-2 w-2 animate-pulse rounded-full bg-current delay-[6s]" />
				</>
			) : (
				<>
					<span className="block h-2 w-2 rounded-full bg-current font-bold" />
					<p className="text-sm font-bold">{statusNameFormatted}</p>
				</>
			)}
		</div>
	);
}
