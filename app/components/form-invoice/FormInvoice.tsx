"use client";

import React, { useRef } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { v4 as uuid } from "uuid";
import ShortUniqueId from "short-unique-id";
import { zodResolver } from "@hookform/resolvers/zod";
import clsx from "clsx";
import { toast } from "react-toastify";
import LinkGoBack from "@/app/components/LinkGoBack";
import LabelTextField from "@/app/components/LabelTextField";
import TextField from "@/app/components/TextField";
import {
  FormValues,
  Invoice,
  InvoiceItemPlusIdRandom,
  Status,
} from "@/app/types";
import Portal from "@/app/components/Portal";
import ListItemsForm from "./components/ListItemsForm";
import useItemForm from "@/app/hooks/useItemForm";
import useModal from "@/app/hooks/useModal";
import formSchema from "@/app/shared/form-schema";
import saveInvoice from "@/app/services/saveInvoice";
import mapperValuesFormToPersistence from "@/app/utils/mapper-values-form-to-persistence";
import removeIdItems from "@/app/utils/remove-id-items";
import { useMutation } from "@tanstack/react-query";
import { useFormActions, useFormStoreStates } from "@/app/stores/form-store";
import updateInvoice from "@/app/services/updateInvoice";
import useInvalidateQueries from "@/app/hooks/useInvalidateQueries";

const newArrayInvoiceFallback: InvoiceItemPlusIdRandom[] = [
  {
    id: 0,
    name: "New Invoice Item",
    price: 0,
    quantity: 0,
    uuid: uuid(),
  },
];

const fallbackDefaultValues = {
  billFromCity: "",
  billFromCountry: "",
  billFromPostCode: "",
  billFromStreetAddress: "",
  billToCity: "",
  billToCountry: "",
  billToEmail: "",
  billToName: "",
  billToPostCode: "",
  billToStreetAddress: "",
  description: "",
  invoiceDate: new Date().toISOString().split("T")[0],
};

type FormCreateNewInvoiceProps = {
  defaultValues?: Invoice;
};

export default function FormCreateNewInvoice({
  defaultValues,
}: FormCreateNewInvoiceProps) {
  let isEditing = !!defaultValues;
  const overlayRef = useRef<HTMLDivElement | null>(null);
  const refButtonSaveAndSend = useRef<HTMLButtonElement | null>(null);
  const { close: onClose } = useFormActions();
  const isOpen = useFormStoreStates();
  const [items, dispatch] = useItemForm(
    defaultValues?.items.map((item) => ({ ...item, uuid: uuid() })) ??
      newArrayInvoiceFallback
  );
  const {
    register,
    formState: { errors },
    reset,
    handleSubmit,
  } = useForm<FormValues>({
    defaultValues: defaultValues
      ? {
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
        }
      : fallbackDefaultValues,
    resolver: zodResolver(formSchema),
  });
  const { invalidate } = useInvalidateQueries();
  const createNewInvoiceMutation = useMutation({
    mutationFn: saveInvoice,
    onSuccess: () => onSuccessMutate(["invoices", "getInvoicesCount"]),
    onError: onErrorMutate,
  });

  const updateInvoiceMutation = useMutation({
    mutationFn: updateInvoice,
    onSuccess: () => onSuccessMutate("getInvoiceById"),
    onError: onErrorMutate,
  });

  function onSuccessMutate(key: string | string[]) {
    if (typeof key === "object") {
      key.forEach((k) => {
        invalidate(k);
      });
    } else {
      invalidate(key);
    }
    onClose();
    reset(defaultValues ? defaultValues : fallbackDefaultValues);
    toast.success(`${isEditing ? "Updated" : "Created"} invoice successfully!`);
  }

  function onErrorMutate() {
    toast.error(
      `${isEditing ? "Updated" : "Created"} invoice failed, try again!`
    );
  }

  const onSubmit: SubmitHandler<FormValues> = async (values, event) => {
    // native event has submitter property
    //@ts-ignore
    const buttonHasSubmittedForm = event?.nativeEvent?.submitter;
    const status =
      buttonHasSubmittedForm === refButtonSaveAndSend.current
        ? Status.PENDING
        : Status.DRAFT;

    // remove id generated forced for not conflicting in bd
    const itemsRemapped = removeIdItems({ status, items });

    const dataToPersistence = {
      invoice: mapperValuesFormToPersistence({
        status,
        values: {
          ...values,
          shortId: new ShortUniqueId().randomUUID(6),
          items: itemsRemapped,
        },
      }),
    };

    if (isEditing) {
      updateInvoiceMutation.mutate({
        invoiceId: defaultValues?.id!,
        invoice: mapperValuesFormToPersistence({
          status,
          values: {
            ...values,
            items,
          },
        }),
      });
    } else {
      createNewInvoiceMutation.mutate(dataToPersistence);
    }
  };

  function handleDiscardProgress() {
    onClose();
  }

  useModal({
    refToCloseModalOnClick: overlayRef,
    onClose,
    isOpen,
  });

  return (
    <Portal>
      <div
        ref={overlayRef}
        className={clsx(
          "ease-linear origin-center fixed w-screen bg-overlay px-6 transition-all duration-300 md:h-screen md:px-0",
          {
            invisible: !isOpen,
            visible: isOpen,
          }
        )}
      >
        <div
          className={clsx(
            "fixed left-0 bottom-0 h-full w-full overflow-y-auto bg-white p-6 pt-24 transition-transform ease-linear scrollbar scrollbar-track-selago duration-300 scrollbar-thumb-shipCove scrollbar-thumb-rounded-md scrollbar-w-3 dark:bg-mirage2 dark:scrollbar-track-mirage2 dark:scrollbar-thumb-ebony md:max-w-3xl md:pt-24 lg:max-w-4xl lg:rounded-tr-2xl lg:rounded-br-2xl lg:pt-6 lg:pl-[7.625rem] lg:pr-11",
            {
              "-translate-x-full": !isOpen,
              "translate-x-0": isOpen,
            }
          )}
        >
          <div className="pb-6 md:hidden">
            <LinkGoBack
              href={isEditing ? `/invoice/${defaultValues?.id}` : "/"}
              onClick={onClose}
            />
          </div>

          {isEditing ? (
            <h2 className="mb-8 text-2xl font-bold text-black dark:text-white">
              Edit<span className="text-shipCove">#</span>
              {defaultValues?.shortId.toLocaleUpperCase()}
            </h2>
          ) : (
            <h2 className="mb-8 text-2xl font-bold text-black dark:text-white">
              New Invoice
            </h2>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="relative">
            <fieldset className="space-between-inputs">
              <legend className="mb-6 text-base font-bold capitalize text-purple">
                bill from
              </legend>

              <div className="mb-6">
                <LabelTextField
                  label="Street Address"
                  isRequiredField
                  errorMessage={errors.billFromStreetAddress?.message}
                >
                  <TextField
                    type="text"
                    {...register("billFromStreetAddress")}
                  />
                </LabelTextField>
              </div>

              <div className="mb-6 flex flex-wrap gap-3 md:[&_label]:min-w-fit md:[&_label]:flex-1 [&_label:not(:last-child)]:flex-1">
                <LabelTextField
                  label="City"
                  isRequiredField
                  errorMessage={errors.billFromCity?.message}
                >
                  <TextField type="text" {...register("billFromCity")} />
                </LabelTextField>
                <LabelTextField
                  label="Post Code"
                  isRequiredField
                  errorMessage={errors.billFromPostCode?.message}
                >
                  <TextField
                    type="text"
                    placeholder="99999-9999"
                    {...register("billFromPostCode")}
                  />
                </LabelTextField>
                <LabelTextField
                  label="Country"
                  isRequiredField
                  errorMessage={errors.billFromCountry?.message}
                >
                  <TextField type="text" {...register("billFromCountry")} />
                </LabelTextField>
              </div>
            </fieldset>

            <fieldset>
              <legend className="mb-6 text-base font-bold capitalize text-purple">
                bill to
              </legend>
              <div className="mb-6">
                <LabelTextField
                  label="Clients's Name"
                  isRequiredField
                  errorMessage={errors.billToName?.message}
                >
                  <TextField type="text" {...register("billToName")} />
                </LabelTextField>
              </div>

              <div className="mb-6">
                <LabelTextField
                  label="Clients's Email"
                  isRequiredField
                  errorMessage={errors.billToEmail?.message}
                >
                  <TextField type="text" {...register("billToEmail")} />
                </LabelTextField>
              </div>

              <div>
                <div className="mb-6">
                  <LabelTextField
                    label="Street Address"
                    isRequiredField
                    errorMessage={errors.billToStreetAddress?.message}
                  >
                    <TextField
                      type="text"
                      {...register("billToStreetAddress")}
                    />
                  </LabelTextField>
                </div>
              </div>

              <div className="mb-6 flex flex-wrap gap-3 md:[&_label]:min-w-fit md:[&_label]:flex-1 [&_label:not(:last-child)]:flex-1">
                <LabelTextField
                  label="City"
                  isRequiredField
                  errorMessage={errors.billToCity?.message}
                >
                  <TextField type="text" {...register("billToCity")} />
                </LabelTextField>
                <LabelTextField
                  label="Post Code"
                  errorMessage={errors.billToPostCode?.message}
                  isRequiredField
                >
                  <TextField
                    type="text"
                    placeholder="99999-9999"
                    {...register("billToPostCode")}
                  />
                </LabelTextField>
                <LabelTextField
                  label="Country"
                  errorMessage={errors.billToCountry?.message}
                  isRequiredField
                >
                  <TextField type="text" {...register("billToCountry")} />
                </LabelTextField>
              </div>

              <div className="mb-6">
                <LabelTextField
                  label="Invoice Date"
                  errorMessage={errors.invoiceDate?.message}
                  isRequiredField
                >
                  <TextField
                    type="date"
                    min={new Date().toISOString().split("T")[0]}
                    {...register("invoiceDate")}
                    disabled={defaultValues ? true : false}
                  />
                </LabelTextField>
              </div>

              <div className="mb-6">
                <LabelTextField
                  label="Project Description"
                  errorMessage={errors.description?.message}
                  isRequiredField
                >
                  <TextField type="text" {...register("description")} />
                </LabelTextField>
              </div>
            </fieldset>

            <ListItemsForm items={items} dispatch={dispatch} />

            <div
              className={clsx(
                "absolute -left-6 flex w-[calc(100%_+_48px)] flex-wrap-reverse items-center justify-center gap-3 bg-ebony p-6 md:static md:w-auto md:bg-transparent md:px-0",
                {
                  "sm:justify-between": !isEditing,
                  "sm:justify-end": isEditing,
                }
              )}
            >
              <div
                className={clsx("", {
                  hidden: isEditing,
                })}
              >
                <button
                  type="button"
                  title="button discard progress"
                  className="h-12 rounded-3xl bg-offWhite px-6 text-xs font-bold text-shipCove transition-all first-letter:capitalize hover:bg-selago dark:bg-ebony dark:text-white dark:hover:opacity-90"
                  onClick={handleDiscardProgress}
                >
                  discard
                </button>
              </div>

              <div className="space-x-3">
                {isEditing ? (
                  <button
                    type="button"
                    title="button discard progress"
                    className="h-12 rounded-3xl bg-offWhite px-6 text-xs font-bold text-shipCove transition-all first-letter:capitalize hover:bg-selago dark:bg-ebony dark:text-white dark:hover:opacity-90"
                    onClick={handleDiscardProgress}
                  >
                    discard
                  </button>
                ) : (
                  <button
                    type="submit"
                    title="button save invoice as draft"
                    className="h-12 rounded-3xl bg-otherDark px-6 text-xs font-bold text-white transition-all first-letter:capitalize hover:opacity-90"
                  >
                    save as draft
                  </button>
                )}
                <button
                  type="submit"
                  title="button save invoice as pending"
                  className="h-12 rounded-3xl bg-purple px-6 text-xs font-bold text-white transition-all first-letter:capitalize hover:bg-heliotrope"
                  ref={refButtonSaveAndSend}
                >
                  save & send
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </Portal>
  );
}
