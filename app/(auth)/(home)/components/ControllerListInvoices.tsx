"use client";

import IllustrationNothingInvoices from "@/app/assets/illustration-empty.svg";
import { InvoiceItem } from "@/app/components";
import getInvoices from "@/app/services/getInvoices";
import { Status } from "@/app/types";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import { useEffect, useMemo } from "react";
import { useInView } from "react-intersection-observer";

const MapperFilters = {
	paid: Status.PAID,
	pending: Status.PENDING,
	draft: Status.DRAFT,
};

export default function ControllerListInvoices() {
	const searchParams = useSearchParams();
	const filter = searchParams?.get("filter");

	const { ref, inView } = useInView({
		threshold: 1,
		delay: 1000,
	});

	const { data, hasNextPage, isFetching, isFetchingNextPage, fetchNextPage } =
		useInfiniteQuery({
			queryKey: ["invoices"],
			queryFn: ({ pageParam = null }) => getInvoices({ cursor: pageParam }),
			getNextPageParam: (lastPage) => lastPage.nextCursor,
		});

	const filterData = useMemo(() => {
		return data?.pages.map((page) =>
			page.invoices?.filter((invoice) => {
				if (!filter || !(filter in MapperFilters)) return true;

				return (
					invoice.status === MapperFilters[filter as keyof typeof MapperFilters]
				);
			})
		);
	}, [filter, data]);

	function checkIfHasDataInFilterActive() {
		return filterData?.some((list) => list.length > 0);
	}

	function checkIfHasData() {
		return data?.pages.some((page) => page.invoices.length > 0);
	}

	useEffect(() => {
		if (inView && hasNextPage && !isFetching) {
			fetchNextPage();
		}
	}, [inView, fetchNextPage, hasNextPage, isFetching]);

	if (checkIfHasDataInFilterActive()) {
		return (
			<>
				{filterData?.map((invoices) => {
					return invoices.map((invoice) => (
						<InvoiceItem key={invoice.id} invoice={invoice} />
					));
				})}

				<div className="flex w-full justify-center pb-6">
					{hasNextPage && isFetchingNextPage ? (
						<div className="flex h-fit w-full items-center justify-center">
							<span className="block h-6 w-6 animate-spin rounded-full border-2 border-shipCove border-r-transparent" />
						</div>
					) : (
						<span className="block h-10 w-10 text-white" ref={ref} />
					)}
				</div>
			</>
		);
	}

	return (
		<div className="flex flex-col items-center justify-center gap-6 p-4 md:p-20">
			<div className="relative h-auto w-auto">
				<IllustrationNothingInvoices />
			</div>
			<p className="text-xl font-bold text-black dark:text-white">
				There is nothing here
			</p>

			{!checkIfHasData() ? (
				<p className="text-center text-sm text-shipCove dark:text-selago">
					Create a invoice by clicking the
					<br />
					<span className="font-bold">New Invoice</span> button and get started
				</p>
			) : (
				<p className="text-center text-sm text-shipCove dark:text-white">
					You no have invoice for the filter selected, try other filter{" "}
				</p>
			)}
		</div>
	);
}
