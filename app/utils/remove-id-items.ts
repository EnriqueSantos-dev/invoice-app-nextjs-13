import { InvoiceItemPlusIdRandom, StatusInvoice } from "@/app/types";

type RemoveIdItems = {
	status: StatusInvoice;
	items: InvoiceItemPlusIdRandom[];
};

export function removeIdItems({ status, items }: RemoveIdItems) {
	if (status === "DRAFT" || status === "PENDING") {
		return items.map((i) => ({
			name: i.name,
			quantity: i.quantity,
			price: i.price,
		}));
	}

	return items;
}
