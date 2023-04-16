import { Invoice } from "@/app/types";
import { StatusInvoiceItem } from "@/app/components/StatusInvoiceItem";
import { getPaymentDateFormatted, formatPrice } from "@/app/utils";
import Link from "next/link";
import { BiChevronRight } from "react-icons/bi";

type InvoiceItemProps = {
  invoice: Invoice;
};

export function InvoiceItem({ invoice }: InvoiceItemProps) {
  const { id, customer, status, paymentDate, items } = invoice;
  const dateFormatted = getPaymentDateFormatted(paymentDate);
  const totalAmount = items.reduce(
    (acc, currentItem) => (acc += currentItem.price),
    0
  );
  const priceFormatted = formatPrice(totalAmount);

  return (
    <Link
      href={`/invoice/${id}`}
      className="flex active:border-purple w-full cursor-pointer flex-col gap-4 rounded-lg border border-white bg-white p-4 text-shipCove outline-none ring-1 ring-transparent transition-colors duration-150 focus:ring-purple hover:border-purple dark:focus:hover:border-ebony dark:border-ebony dark:bg-ebony dark:text-white dark:hover:border-purple md:flex-row md:justify-between md:py-6"
    >
      <div className="flex items-center justify-between md:justify-start md:gap-6">
        <p className="font-bold uppercase text-black dark:text-white">
          <span className="text-shipCove">#</span>
          {invoice.shortId}
        </p>

        <p className="hidden text-xs md:block md:text-base">{dateFormatted}</p>

        <p className="overflow-hidden text-ellipsis text-sm text-baliHai dark:text-white md:ml-2 md:text-base">
          {customer.name}
        </p>
      </div>

      <div className="flex items-end justify-between md:items-center">
        <div className="md:mr-10">
          <p className="mb-1 text-xs md:hidden md:text-base">{dateFormatted}</p>
          <p className="text-xl font-bold text-mirage dark:text-white">
            {priceFormatted}
          </p>
        </div>
        <StatusInvoiceItem status={status} />
        <BiChevronRight className="ml-2 hidden h-6 w-6 fill-purple font-bold md:block" />
      </div>
    </Link>
  );
}
