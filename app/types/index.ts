export interface Invoice {
	id: string;
	shortId: string;
	status: StatusInvoice;
	description: string;
	paymentDate: string;
	createdAt: string;
	ownerAddress: Address;
	customer: Customer;
	items: InvoiceItem[];
}

export interface InvoiceItem {
	id: number;
	name: string;
	price: number;
	quantity: number;
}

export interface InvoiceItemPlusIdRandom extends InvoiceItem {
	uuid: string;
}

export const Status = {
	DRAFT: "DRAFT",
	PENDING: "PENDING",
	PAID: "PAID",
} as const;

export type StatusInvoice = (typeof Status)[keyof typeof Status];

export interface User {
	id: string;
	name: string;
	email: string;
	image: string;
	invoices: Invoice[];
}

export interface Address {
	id?: number;
	streetAddress: string;
	zipCode: string;
	country: string;
	city: string;
}

export interface Customer {
	id?: string;
	name: string;
	email: string;
	address: Address;
}

export type FormValues = {
	billFromStreetAddress: string;
	billFromPostCode: string;
	billFromCountry: string;
	billFromCity: string;
	billToName: string;
	billToEmail: string;
	billToStreetAddress: string;
	billToPostCode: string;
	billToCountry: string;
	billToCity: string;
	invoiceDate: string;
	description: string;
	items: InvoiceItemPlusIdRandom[];
};
