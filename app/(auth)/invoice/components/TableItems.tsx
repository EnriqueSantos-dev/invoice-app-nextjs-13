import { InvoiceItem } from "@/app/types";
import { calculateTotalPriceItem, formatPrice } from "@/app/utils";

type Props = {
  items: InvoiceItem[];
};

export function TableItems({ items }: Props) {
  return (
    <div
      className="max-h-60 overflow-auto
    "
    >
      <table className="hidden w-full border-separate p-8 md:table dark:[&_th]:text-white dark:[&_td]:text-white">
        <thead>
          <tr className=" capitalize [&_th:not(:nth-child(1))]:text-right [&_th]:text-xs">
            <th className="text-left font-normal text-shipCove">Item Name</th>
            <th className="font-normal text-shipCove">QTY.</th>
            <th className="font-normal text-shipCove">price</th>
            <th className="font-normal text-shipCove">Total</th>
          </tr>
          <tr className="h-3" />
        </thead>
        <tbody className="max-h-40 overflow-auto">
          {items.map((item) => (
            <tr key={item.id} className="h-10 [&_td]:text-sm">
              <td className="font-bold text-vulcan first-letter:capitalize">
                {item.name}
              </td>
              <td className="text-right text-shipCove">{item.quantity}</td>
              <td className="text-right text-shipCove">
                {formatPrice(item.price)}
              </td>
              <td className="text-right font-bold text-vulcan">
                {formatPrice(calculateTotalPriceItem(item))}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
