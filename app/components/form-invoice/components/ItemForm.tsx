"use client";

import React from "react";
import LabelTextField from "@/app/components/LabelTextField";
import TextField from "@/app/components/TextField";
import { formatPrice } from "@/app/utils/format-price";
import { BiTrash } from "react-icons/bi";
import { ActionType, Actions } from "@/app/hooks/useItemForm";
import { InvoiceItemPlusIdRandom } from "@/app/types";

type InvoiceItemListProps = {
  dispatchActions: React.Dispatch<Actions>;
  item: InvoiceItemPlusIdRandom;
};

export default function ItemInvoiceList({
  item,
  dispatchActions,
}: InvoiceItemListProps) {
  return (
    <div>
      <LabelTextField label="item name" isRequiredField>
        <TextField
          type="text"
          defaultValue={item.name}
          onChange={(e) =>
            dispatchActions({
              type: Actions.CHANGE_ITEM,
              payload: { item: { ...item, name: e.target.value } },
            })
          }
        />
      </LabelTextField>

      <div className="mt-6 flex items-center gap-3 [&_>_label]:max-w-fit">
        <LabelTextField label="Qty." isRequiredField>
          <TextField
            type="number"
            defaultValue={item.quantity}
            onChange={(e) =>
              dispatchActions({
                type: Actions.CHANGE_ITEM,
                payload: {
                  item: { ...item, quantity: Number(e.target.value) },
                },
              })
            }
          />
        </LabelTextField>

        <LabelTextField label="price" isRequiredField>
          <TextField
            type="number"
            defaultValue={item.price}
            onChange={(e) =>
              dispatchActions({
                type: Actions.CHANGE_ITEM,
                payload: { item: { ...item, price: Number(e.target.value) } },
              })
            }
          />
        </LabelTextField>

        <LabelTextField label="total" isRequiredField>
          <TextField
            type="text"
            readOnly
            value={formatPrice(item.quantity * item.price)}
          />
        </LabelTextField>

        <button
          type="button"
          title="delete item for list item invoice"
          className="bottom-0 flex h-12 items-center justify-center self-end px-2"
          onClick={() =>
            dispatchActions({
              type: Actions.DELETE_ITEM,
              payload: { uuid: item.uuid },
            })
          }
        >
          <BiTrash className="h-5 w-5 fill-shipCove" />
        </button>
      </div>
    </div>
  );
}
