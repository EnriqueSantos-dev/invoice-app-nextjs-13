"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import clsx from "clsx";
import { StatusInvoice } from "@/app/types";
import getStatusInvoiceNameFormatted from "@/app/utils/get-status-invoice-name-formatted";
import { BiChevronDown, BiChevronUp } from "react-icons/bi";

type FilterInvoiceProps = {
  options: StatusInvoice[];
};

export default function FilterInvoice({ options }: FilterInvoiceProps) {
  const route = useRouter();
  const searchParams = useSearchParams();
  const [menuIsExpanded, setMenuIsExpanded] = useState(false);
  const [filterActive, setFilterActive] = useState<StatusInvoice | null>(
    (searchParams!.get("filter")?.toUpperCase() as StatusInvoice) ?? null
  );

  function handleChangeFilter(filter: StatusInvoice) {
    setFilterActive((prev) => (prev === filter ? null : filter));
    setMenuIsExpanded(false);
  }

  useEffect(() => {
    const urlSearchParams = new URLSearchParams();

    if (filterActive) {
      urlSearchParams.append("filter", filterActive.toLowerCase());
      return route.push(`/?${urlSearchParams}`);
    }

    urlSearchParams.delete("filter");
    return route.push(`/?${urlSearchParams}`);
  }, [filterActive, route]);

  return (
    <div
      className={clsx(
        "relative w-full max-w-[158px] text-black transition-all dark:text-white",
        {
          "h-10 overflow-hidden": !menuIsExpanded,
          "h-full max-h-fit overflow-visible": menuIsExpanded,
        }
      )}
    >
      <button
        type="button"
        title="toggle popup modal filters"
        className="flex w-fit items-center justify-end gap-2 whitespace-nowrap px-3 py-2 text-base font-bold text-black dark:text-white"
        onClick={() => setMenuIsExpanded((prev) => !prev)}
      >
        filter <span className="hidden md:inline-block">by status</span>
        {menuIsExpanded ? (
          <BiChevronUp className="h-5 w-5 fill-purple font-bold" />
        ) : (
          <BiChevronDown className="h-5 w-5 fill-purple font-bold" />
        )}
      </button>

      <div
        className={clsx(
          "absolute  right-0 top-12 z-10 w-[calc(100%+80px)] origin-[top_center] rounded-md bg-white py-4 pl-6 pr-4 shadow-md transition-all duration-200 dark:bg-ebony md:w-[calc(100%+50px)]",
          {
            "invisible scale-0 opacity-0": !menuIsExpanded,
            "visible scale-100 opacity-100": menuIsExpanded,
          }
        )}
      >
        <ul>
          {options.map((status) => (
            <StatusFilterCheckbox
              key={getStatusInvoiceNameFormatted(status)}
              status={status}
              changeFilter={handleChangeFilter}
              isChecked={status === filterActive}
            />
          ))}
        </ul>
      </div>
    </div>
  );
}

interface StatusFilterCheckboxProps {
  status: StatusInvoice;
  // eslint-disable-next-line no-unused-vars
  changeFilter: (filterName: StatusInvoice) => void;
  isChecked: boolean;
}

function StatusFilterCheckbox({
  status,
  changeFilter,
  isChecked,
}: StatusFilterCheckboxProps) {
  const statusNameFormatted = getStatusInvoiceNameFormatted(status);

  return (
    <li className="py-2 text-sm font-bold text-black dark:text-white lg:text-base">
      <label className="flex w-full cursor-pointer items-center gap-3 capitalize">
        <input
          type="checkbox"
          name="filter"
          className="checkboxCustom"
          value={status}
          checked={isChecked}
          onChange={() => changeFilter(status)}
        />
        {statusNameFormatted}
      </label>
    </li>
  );
}
