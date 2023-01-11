"use client";

import React from "react";
import ItemInvoice from "./ItemForm";
import { BiPlus } from "react-icons/bi";
import { Actions } from "@/app/hooks/useItemForm";
import { InvoiceItemPlusIdRandom } from "@/app/types";

type FormItemListProps = {
  dispatch: React.Dispatch<Actions>;
  items: InvoiceItemPlusIdRandom[];
};

export default function FormItemList({ items, dispatch }: FormItemListProps) {
  return (
    <div className="mt-12 mb-6">
      <h2 className="mb-6 text-xl font-bold text-[#777f98] dark:text-white">
        items list (optional)
      </h2>

      {items.length > 0 && (
        <div className="mb-10 flex flex-col gap-6 space-y-10">
          {items?.map((i) => (
            <ItemInvoice key={i.uuid} item={i} dispatchActions={dispatch} />
          ))}
        </div>
      )}

      <button
        className="flex h-12 w-full items-center justify-center gap-2 rounded-[20px] bg-offWhite font-bold text-shipCove dark:bg-ebony dark:text-white"
        onClick={() => dispatch({ type: Actions.ADD_ITEM })}
        type="button"
      >
        <BiPlus />
        add new item
      </button>
    </div>
  );
}
