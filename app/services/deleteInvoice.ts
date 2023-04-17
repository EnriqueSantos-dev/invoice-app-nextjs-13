import api from "../lib/axios";

export default async function deleteInvoice({
	invoiceId,
}: {
	invoiceId: string;
}): Promise<void> {
	await api.delete(`/invoice/${invoiceId}`);
}
