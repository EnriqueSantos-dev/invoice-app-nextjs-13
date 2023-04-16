import { v4 as uuid } from "uuid";
import { Invoice } from "../types";

export function mapperDefaultValuesToSchemaForm(defaultValues: Invoice) {
  return {
    billFromCity: defaultValues.ownerAddress.city,
    billFromCountry: defaultValues.ownerAddress.country,
    billFromPostCode: defaultValues.ownerAddress.zipCode,
    billFromStreetAddress: defaultValues.ownerAddress.streetAddress,
    billToCity: defaultValues.customer.address.city,
    billToCountry: defaultValues.customer.address.country,
    billToEmail: defaultValues.customer.email,
    billToName: defaultValues.customer.name,
    billToPostCode: defaultValues.customer.address.zipCode,
    billToStreetAddress: defaultValues.customer.address.streetAddress,
    description: defaultValues.description,
    invoiceDate: new Date(defaultValues.paymentDate)
      .toISOString()
      .split("T")[0],
    items: defaultValues.items.map((item) => ({ ...item, uuid: uuid() })),
  };
}
