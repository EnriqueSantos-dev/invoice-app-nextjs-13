"use client";

import { useReducer } from "react";
import { InvoiceItemPlusIdRandom } from "@/app/types";
import { v4 as uuid } from "uuid";

export const Actions = {
  CHANGE_ITEM: "changeItem",
  DELETE_ITEM: "deleteItem",
  ADD_ITEM: "addItem",
} as const;

export type ActionType = (typeof Actions)[keyof typeof Actions];

export type Actions = {
  type: ActionType;
  payload?: {
    uuid?: string;
    item?: InvoiceItemPlusIdRandom;
  };
};

function reducer(state: InvoiceItemPlusIdRandom[], action: Actions) {
  switch (action.type) {
    case Actions.CHANGE_ITEM:
      return state.map((i) =>
        i.uuid === action?.payload?.item?.uuid
          ? { ...i, ...action.payload?.item }
          : i
      );
    case Actions.DELETE_ITEM:
      return state.filter((i) => i.uuid !== action.payload?.uuid!);

    case Actions.ADD_ITEM:
      const newItem = {
        id: state.length - 1 + 1,
        uuid: uuid(),
        name: "New invoice item",
        price: 0,
        quantity: 1,
      };
      return [...state, newItem];

    default:
      return state;
  }
}

export default function useItemForm(initialState: InvoiceItemPlusIdRandom[]) {
  return useReducer(reducer, initialState);
}
