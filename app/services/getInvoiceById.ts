import { Invoice } from "@/app/types";
import api from "@/lib/axios";

type GetInvoiceByIdProps = {
	invoiceId: string;
};

export default async function getInvoiceById({
	invoiceId,
}: GetInvoiceByIdProps): Promise<Invoice> {
	const res = await api.get(`/invoice/${invoiceId}`);
	return res.data;
}
