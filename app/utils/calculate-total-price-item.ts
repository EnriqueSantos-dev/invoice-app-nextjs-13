import { InvoiceItem } from "@/app/types";

export function calculateTotalPriceItem(item: InvoiceItem) {
	return item.price * item.quantity;
}
