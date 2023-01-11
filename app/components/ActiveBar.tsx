"use client";

import React from "react";
import FilterInvoice from "./FilterInvoice";
import { Status } from "@/app/types";
import { BsPlus } from "react-icons/bs";
import FormInvoice from "./form-invoice/FormInvoice";
import { useFormActions } from "@/app/stores/form-store";
import { useQuery } from "@tanstack/react-query";
import getInvoicesCount from "../services/getInvoicesCount";

type ActiveBarProps = {
  count: number;
};

export default function ActiveBar({ count }: ActiveBarProps) {
  const { open } = useFormActions();
  const { data } = useQuery({
    queryKey: ["getInvoicesCount"],
    queryFn: () => getInvoicesCount(),
    initialData: { count },
  });

  return (
    <>
      <FormInvoice />
      <div className="flex items-center justify-between px-1">
        <div>
          <h1 className="text-3xl font-bold text-black dark:text-white md:mb-3 xl:text-4xl">
            Invoices
          </h1>
          <p className="text-sm text-baliHai first-letter:capitalize dark:text-white md:hidden xl:text-base">
            {data.count ?? 0} invoice(s)
          </p>
          <p className="hidden text-sm text-baliHai first-letter:capitalize dark:text-white md:block xl:text-base">
            there are total {data.count ?? 0} invoice(s)
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <FilterInvoice
            options={[Status.DRAFT, Status.PENDING, Status.PAID]}
          />
          <button
            type="button"
            title="create new invoice button"
            className="flex h-12 items-center justify-center gap-3 rounded-3xl bg-purple pl-2 pr-4 text-base font-bold text-white transition-colors duration-200 hover:bg-heliotrope"
            onClick={() => open()}
          >
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white">
              <BsPlus className="h-5 w-5 fill-purple stroke-purple stroke-[0.8]" />
            </span>
            New <span className="hidden md:inline-block">invoice</span>
          </button>
        </div>
      </div>
    </>
  );
}
