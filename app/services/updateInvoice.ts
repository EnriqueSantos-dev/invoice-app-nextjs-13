import api from "../lib/axios";

type UpdateInvoiceProps = {
  invoiceId: string;
  invoice: any;
};

export default async function updateInvoice({
  invoiceId,
  invoice,
}: UpdateInvoiceProps): Promise<void> {
  await api.patch(`/invoice/${invoiceId}/update`, {
    invoice,
  });
}
