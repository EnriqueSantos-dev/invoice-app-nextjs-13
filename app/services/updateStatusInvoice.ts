import { StatusInvoice } from "@/app/types";
import api from "@/lib/axios";

type UpdateStatusProps = {
  invoiceId: string;
  status: StatusInvoice;
};

export default async function updateInvoiceStatus({
  invoiceId,
  status,
}: UpdateStatusProps): Promise<void> {
  await api.patch(`/invoice/${invoiceId}`, {
    status,
  });
}
