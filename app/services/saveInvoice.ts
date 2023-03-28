import api from "@/lib/axios";

type SaveInvoiceProps = {
  invoice: any;
};

export default async function saveInvoice({ invoice }: SaveInvoiceProps) {
  const response = await api.post("/save-invoice", {
    invoice,
  });

  return response.data;
}
