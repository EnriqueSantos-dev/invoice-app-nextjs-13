import clsx from "clsx";
import { StatusInvoice, Status } from "@/app/types";
import getStatusInvoiceNameFormatted from "@/app/utils/get-status-invoice-name-formatted";

interface StatusInvoiceItemProps {
  status: StatusInvoice;
  isLoadingStatus?: boolean;
}

export default function StatusInvoiceItem({
  status,
  isLoadingStatus,
}: StatusInvoiceItemProps) {
  const statusNameFormatted = getStatusInvoiceNameFormatted(status);

  return (
    <div
      className={clsx(
        "flex min-w-[7rem] items-center justify-center gap-2 rounded px-3 h-9 capitalize",
        {
          "bg-greenFaded text-greenColorStatusInvoice": status === Status.PAID,
          "bg-fadedOrange text-orange": status === Status.PENDING,
          "bg-bgDraftStatusLight text-otherDark dark:bg-bgDraftStatusDark dark:text-white":
            status === Status.DRAFT,
        }
      )}
    >
      {isLoadingStatus ? (
        <>
          <span className="block h-2 w-2 rounded-full bg-current animate-pulse" />
          <span className="block h-2 w-2 rounded-full delay-[2s] bg-current animate-pulse" />
          <span className="block h-2 w-2 rounded-full bg-current delay-[6s] animate-pulse" />
        </>
      ) : (
        <>
          <span className="block h-2 w-2 rounded-full bg-current font-bold" />
          <p className="text-sm font-bold">{statusNameFormatted}</p>
        </>
      )}
    </div>
  );
}
