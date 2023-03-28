import { Invoice, StatusInvoice } from "@/app/types";
import api from "@/lib/axios";

type GetInvoicesProps = {
  cursor?: string | null;
};

export type GetInvoicesResponse = {
  nextCursor: string | null | undefined;
  invoices: Invoice[];
};

export default async function getInvoices({
  cursor,
}: GetInvoicesProps): Promise<GetInvoicesResponse> {
  const res = await api.get("/get-invoices", {
    params: { cursor },
  });
  const data = res.data;
  return data;
}
