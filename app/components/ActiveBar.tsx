"use client";

import { FormCreateOrEditInvoice, FilterInvoice } from "@/app/components";
import { Status } from "@/app/types";
import { useQuery } from "@tanstack/react-query";
import getInvoicesCount from "@/app/services/getInvoicesCount";

type ActiveBarProps = {
	count: number;
};

export function ActiveBar({ count }: ActiveBarProps) {
	const { data } = useQuery({
		queryKey: ["getInvoicesCount"],
		queryFn: () => getInvoicesCount(),
		initialData: { count },
	});

	return (
		<>
			<div className="flex items-center justify-between px-1">
				<div>
					<h1 className="text-3xl font-bold text-black dark:text-white md:mb-3 xl:text-4xl">
						Invoices
					</h1>
					<p className="text-sm text-baliHai first-letter:capitalize dark:text-white md:hidden xl:text-base">
						{data.count ?? 0} invoice(s)
					</p>
					<p className="hidden text-sm text-baliHai first-letter:capitalize dark:text-white md:block xl:text-base">
						there are total {data.count ?? 0} invoice(s)
					</p>
				</div>

				<div className="flex items-center space-x-3">
					<FilterInvoice
						options={[Status.DRAFT, Status.PENDING, Status.PAID]}
					/>
					<FormCreateOrEditInvoice />
				</div>
			</div>
		</>
	);
}
