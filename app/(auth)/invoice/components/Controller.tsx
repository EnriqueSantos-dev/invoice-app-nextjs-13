"use client";

import { LinkGoBack } from "@/app/components/LinkGoBack";
import { StatusInvoiceItem } from "@/app/components/StatusInvoiceItem";
import getInvoiceById from "@/app/services/getInvoiceById";
import {
	formatPrice,
	calculateTotalPriceItem,
	calculateTotalAmountDue,
} from "@/app/utils";
import { Invoice } from "@/app/types";
import { useQuery } from "@tanstack/react-query";
import { ButtonsActions } from "./ActionButtons";
import { TableItems } from "./TableItems";

type Props = {
	initialData: Invoice;
};

export function Controller({ initialData }: Props) {
	const { data, isFetching } = useQuery({
		queryKey: ["getInvoiceById"],
		queryFn: () => getInvoiceById({ invoiceId: initialData.id }),
		suspense: true,
		initialData,
		staleTime: 5000,
	});

	function formatDate(date: Date): string {
		return new Intl.DateTimeFormat("en-US", {
			day: "2-digit",
			month: "short",
			year: "numeric",
		})
			.format(date)
			.replace(/\,/gi, " ");
	}

	const createdAtDateInvoiceFormatted = formatDate(new Date(data?.createdAt!));
	const paymentDueFormatted = formatDate(new Date(data?.paymentDate!));

	return (
		<div className="flex h-full flex-col gap-4">
			<div className="flex w-full items-center justify-start pb-8">
				<LinkGoBack href="/" />
			</div>

			<div className="item-center flex justify-between rounded-lg bg-white p-6 shadow-sm transition-colors duration-300 dark:bg-mirage">
				<div className="flex flex-1 items-center justify-between md:flex-auto md:justify-start md:gap-4">
					<p className="text-baliHai dark:text-white">Status</p>
					<StatusInvoiceItem
						status={data?.status!}
						isLoadingStatus={isFetching}
					/>
				</div>
				<ButtonsActions invoice={data!} />
			</div>

			<div className="rounded-lg bg-white p-6 shadow-sm transition-colors duration-300 dark:bg-mirage">
				<div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
					<div>
						<p className="mb-2 text-sm font-bold uppercase text-vulcan dark:text-white md:mb-1">
							<span className="text-shipCove">#</span>
							{data?.shortId}
						</p>
						<p className="text-xs text-shipCove dark:text-white md:text-sm">
							{data?.description}
						</p>
					</div>
					<address className="space-y-1 text-xs capitalize not-italic text-shipCove dark:text-white md:text-sm">
						<p>{data?.ownerAddress.streetAddress}</p>
						<p>{data?.ownerAddress.city}</p>
						<p className="uppercase">{data?.ownerAddress.zipCode}</p>
						<p>{data?.ownerAddress.country}</p>
					</address>
				</div>

				<div className="mt-8 flex flex-wrap gap-16">
					<div className="flex flex-col gap-8">
						<div>
							<p className="mb-2 text-xs text-shipCove dark:text-white">
								Invoice Date
							</p>
							<h2 className="text-xl font-bold text-vulcan dark:text-white">
								{createdAtDateInvoiceFormatted}
							</h2>
						</div>
						<div>
							<p className="mb-2 text-xs text-shipCove dark:text-white">
								Payment Due
							</p>
							<h2 className="text-xl font-bold text-vulcan dark:text-white">
								{paymentDueFormatted}
							</h2>
						</div>
					</div>
					<div>
						<p className="mb-2 text-xs text-shipCove dark:text-white">
							Bill to
						</p>
						<h2 className="mb-3 text-xl font-bold text-vulcan dark:text-white">
							{data?.customer.name}
						</h2>
						<address className="space-y-1 text-xs capitalize not-italic text-shipCove dark:text-white md:text-sm">
							<p className="dark:text-white">
								{data?.ownerAddress.streetAddress}
							</p>
							<p className="dark:text-white">{data?.ownerAddress.city}</p>
							<p className="uppercase dark:text-white">
								{data?.ownerAddress.zipCode}
							</p>
							<p className="dark:text-white">{data?.ownerAddress.country}</p>
						</address>
					</div>
					<div className="text-left">
						<p className="mb-2 text-xs text-shipCove dark:text-white">
							Send to
						</p>
						<h2 className="text-xl font-bold text-vulcan dark:text-white">
							{data?.customer.email}
						</h2>
					</div>
				</div>

				<div className="mt-10 overflow-hidden rounded-lg bg-offWhite transition-colors duration-300 dark:bg-ebony">
					<div className="w-full space-y-4 p-6 md:hidden">
						{data?.items.map((item) => (
							<div
								key={item.id}
								className="flex items-center justify-between text-xs"
							>
								<div className="font-bold">
									<p className="mb-1 text-black dark:text-white">{item.name}</p>
									<p className="text-shipCove dark:text-white">
										{item.quantity}x{formatPrice(item.price)}
									</p>
								</div>

								<p className="font-bold text-black dark:text-white">
									{formatPrice(calculateTotalPriceItem(item))}
								</p>
							</div>
						))}
					</div>
					<TableItems items={data?.items!} />
					<div className="flex items-center justify-between bg-otherDark px-6 py-8 dark:bg-vulcan">
						<p className="text-sm text-white md:hidden">Grand total</p>
						<p className="hidden text-sm text-white md:block">Amount Due</p>
						<p className="text-2xl font-bold text-white">
							{formatPrice(calculateTotalAmountDue(data?.items!))}
						</p>
					</div>
				</div>
			</div>
		</div>
	);
}
