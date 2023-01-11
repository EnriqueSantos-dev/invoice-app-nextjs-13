import { InvoiceItem } from "@/app/types";

export default function calculateTotalPriceItem(item: InvoiceItem) {
  return item.price * item.quantity;
}
