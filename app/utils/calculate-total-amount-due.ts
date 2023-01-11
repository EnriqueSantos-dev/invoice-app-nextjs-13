import { InvoiceItem } from "@/app/types";

export default function calculateTotalAmountDue(items: InvoiceItem[]) {
  const totalPrice = items.reduce(
    (acc, item) => (acc += item.price * item.quantity),
    0
  );

  return totalPrice;
}
