import {
  FormValues,
  InvoiceItemPlusIdRandom,
  StatusInvoice,
} from "@/app/types";

type MapperValuesFormToPersistenceProps = {
  values: {
    shortId?: string;
    items: Partial<InvoiceItemPlusIdRandom>[];
  } & Omit<FormValues, "items">;
  status: StatusInvoice;
};

export function mapperValuesFormToPersistence({
  values,
  status,
}: MapperValuesFormToPersistenceProps) {
  return {
    shortId: values.shortId,
    customer: {
      city: values.billToCity,
      streetAddress: values.billToStreetAddress,
      country: values.billToCountry,
      email: values.billToEmail,
      name: values.billToName,
      zipCode: values.billToPostCode,
    },
    ownerAddress: {
      city: values.billFromCity,
      streetAddress: values.billFromStreetAddress,
      country: values.billFromCountry,
      zipCode: values.billFromPostCode,
    },
    description: values.description,
    items: values.items.map((item) => {
      const { uuid, ...rest } = item;
      return rest;
    }),
    status: status,
    paymentDate: values.invoiceDate,
  };
}
