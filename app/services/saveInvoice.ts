import api from "@/lib/axios";
import { Invoice } from "../types";

type SaveInvoiceProps = {
  invoice: any;
};

export default async function saveInvoice({ invoice }: SaveInvoiceProps) {
  const response = await api.post("/saveInvoice", {
    invoice,
  });

  return response.data;
}
