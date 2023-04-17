import { InvoiceItem } from "@/app/types";

export function calculateTotalAmountDue(items: InvoiceItem[]) {
	const totalPrice = items.reduce(
		(acc, item) => (acc += item.price * item.quantity),
		0
	);

	return totalPrice;
}
