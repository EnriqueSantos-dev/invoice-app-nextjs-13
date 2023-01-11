import { StatusInvoice, Status } from "@/app/types";

export default function getStatusInvoiceNameFormatted(status: StatusInvoice) {
  if (status === Status.DRAFT) {
    return "draft";
  }

  if (status === Status.PENDING) {
    return "pending";
  }

  return "paid";
}
