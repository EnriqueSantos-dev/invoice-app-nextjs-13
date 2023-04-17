"use client";

import { StatusInvoice } from "@/app/types";
import { getStatusInvoiceNameFormatted } from "@/app/utils";
import * as Popover from "@radix-ui/react-popover";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { BiChevronDown } from "react-icons/bi";

type FilterInvoiceProps = {
	options: StatusInvoice[];
};

export function FilterInvoice({ options }: FilterInvoiceProps) {
	const route = useRouter();
	const searchParams = useSearchParams();
	const [menuIsExpanded, setMenuIsExpanded] = useState(false);
	const [filterActive, setFilterActive] = useState<StatusInvoice | null>(
		(searchParams!.get("filter")?.toUpperCase() as StatusInvoice) ?? null
	);

	function handleChangeFilter(filter: StatusInvoice) {
		setFilterActive((prev) => (prev === filter ? null : filter));
		setMenuIsExpanded(false);
	}

	useEffect(() => {
		const urlSearchParams = new URLSearchParams();

		if (filterActive) {
			urlSearchParams.append("filter", filterActive.toLowerCase());
			route.push(`/?${urlSearchParams}`);
			return;
		}

		urlSearchParams.delete("filter");
		route.push(`/?${urlSearchParams}`);
	}, [filterActive, route]);

	return (
		<Popover.Root
			open={menuIsExpanded}
			onOpenChange={() => setMenuIsExpanded((prev) => !prev)}
		>
			<Popover.Trigger
				type="button"
				title="toggle popup modal filters"
				className="group flex w-fit items-center justify-end gap-2 whitespace-nowrap px-3 py-2 text-base font-bold text-black dark:text-white"
			>
				filter <span className="hidden md:inline-block">by status</span>
				<BiChevronDown className="h-5 w-5 fill-purple font-bold transition-transform group-data-[state=open]:rotate-180" />
			</Popover.Trigger>

			<Popover.Portal>
				<Popover.Content
					sideOffset={10}
					className="w-[calc(100%+80px)] origin-[top_center] rounded-md bg-white py-4 pl-6 pr-4 shadow-md transition-all duration-200 data-[state=open]:animate-[fade-in_100ms_ease-in-out,scale_100ms_ease-in-out] dark:bg-ebony md:w-[calc(100%+50px)]"
				>
					<ul>
						{options.map((status) => (
							<StatusFilterCheckbox
								key={getStatusInvoiceNameFormatted(status)}
								status={status}
								changeFilter={handleChangeFilter}
								isChecked={status === filterActive}
							/>
						))}
					</ul>
				</Popover.Content>
			</Popover.Portal>
		</Popover.Root>
	);
}

interface StatusFilterCheckboxProps {
	status: StatusInvoice;
	// eslint-disable-next-line no-unused-vars
	changeFilter: (filterName: StatusInvoice) => void;
	isChecked: boolean;
}

function StatusFilterCheckbox({
	status,
	changeFilter,
	isChecked,
}: StatusFilterCheckboxProps) {
	const statusNameFormatted = getStatusInvoiceNameFormatted(status);

	return (
		<li className="py-2 text-sm font-bold text-black dark:text-white lg:text-base">
			<label className="flex w-full cursor-pointer items-center gap-3 capitalize">
				<input
					type="checkbox"
					name="filter"
					className="checkboxCustom"
					value={status}
					checked={isChecked}
					onChange={() => changeFilter(status)}
				/>
				{statusNameFormatted}
			</label>
		</li>
	);
}
