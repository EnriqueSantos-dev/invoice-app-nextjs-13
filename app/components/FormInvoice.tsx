"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { useRef, useState } from "react";
import { useForm, SubmitHandler, useFieldArray } from "react-hook-form";
import { v4 as uuid } from "uuid";
import ShortUniqueId from "short-unique-id";
import { zodResolver } from "@hookform/resolvers/zod";
import clsx from "clsx";
import { toast } from "react-toastify";
import { FormValues, Invoice, Status } from "@/app/types";
import formSchema from "@/app/shared/form-schema";
import saveInvoice from "@/app/services/saveInvoice";
import {
  removeIdItems,
  formatPrice,
  mapperValuesFormToPersistence,
  mapperDefaultValuesToSchemaForm,
} from "@/app/utils";
import { useMutation } from "@tanstack/react-query";
import updateInvoice from "@/app/services/updateInvoice";
import useInvalidateQueries from "@/app/hooks/useInvalidateQueries";
import { BiPlus, BiTrash } from "react-icons/bi";
import { BsPlus } from "react-icons/bs";
import { LabelTextField, LinkGoBack, TextField } from "@/app/components";

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
  items: [
    {
      id: 0,
      name: "New Invoice Item",
      price: 0,
      quantity: 0,
      uuid: uuid(),
    },
  ],
};

type FormCreateNewInvoiceProps = {
  defaultValues?: Invoice;
};

export function FormCreateOrEditInvoice({
  defaultValues,
}: FormCreateNewInvoiceProps) {
  const isEditing = !!defaultValues;
  const refButtonSaveAndSend = useRef<HTMLButtonElement | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const {
    register,
    formState: { errors },
    reset,
    handleSubmit,
    control,
    watch,
  } = useForm<FormValues>({
    defaultValues: defaultValues
      ? mapperDefaultValuesToSchemaForm(defaultValues)
      : fallbackDefaultValues,
    resolver: zodResolver(formSchema),
  });
  const { fields, remove, append } = useFieldArray({
    control,
    name: "items",
    keyName: "uuid",
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
    reset(defaultValues ? defaultValues : fallbackDefaultValues);
    toast.success(`${isEditing ? "Updated" : "Created"} invoice successfully!`);
    setIsFormOpen(false);
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
    const itemsRemapped = removeIdItems({ status, items: values.items });

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
            items: values.items,
          },
        }),
      });
    } else {
      createNewInvoiceMutation.mutate(dataToPersistence);
    }
  };

  function getRealTimeTotalPrice(index: number) {
    return (
      watch(`items.${index}.quantity` as const) *
      watch(`items.${index}.price` as const)
    );
  }

  function handleAddItem() {
    append({
      id: 0,
      uuid: uuid(),
      name: "New Invoice item",
      price: 0,
      quantity: 0,
    });
  }

  function handleRemoveItem(index: number) {
    if (fields.length > 1) {
      remove(index);
    }
  }

  function handleCloseForm() {
    setIsFormOpen((prev) => !prev);
  }

  return (
    <Dialog.Root open={isFormOpen} onOpenChange={handleCloseForm}>
      {!isEditing ? (
        <Dialog.Trigger
          title="create new invoice button"
          className="flex h-12 items-center justify-center gap-3 rounded-3xl bg-purple pl-2 pr-4 text-base font-bold text-white transition-colors duration-200 hover:bg-heliotrope"
        >
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white">
            <BsPlus className="h-5 w-5 fill-purple stroke-purple stroke-[0.8]" />
          </span>
          New <span className="hidden md:inline-block">invoice</span>
        </Dialog.Trigger>
      ) : (
        <Dialog.Trigger
          title="edit invoice button"
          className="h-12 rounded-3xl bg-offWhite px-6 text-xs font-bold text-shipCove transition-all first-letter:capitalize hover:bg-selago dark:bg-ebony dark:hover:opacity-90"
        >
          edit
        </Dialog.Trigger>
      )}
      <Dialog.Portal>
        <Dialog.Overlay className="animate-fade-in fixed inset-0 bg-overlay px-6 transition-all duration-300 md:h-screen md:px-0" />
        <Dialog.Content className="fixed left-0 bottom-0 h-full w-full overflow-y-auto bg-white p-6 pt-24 ease-linear scrollbar scrollbar-track-selago duration-300 scrollbar-thumb-shipCove scrollbar-thumb-rounded-md scrollbar-w-3 dark:bg-mirage2 dark:scrollbar-track-mirage2 dark:scrollbar-thumb-ebony md:max-w-3xl md:pt-24 lg:max-w-4xl lg:rounded-tr-2xl lg:rounded-br-2xl lg:pt-6 lg:pl-[7.625rem] lg:pr-11 data-[state=open]:translate-x-0 data-[state=closed]:-translate-x-full transition-all">
          <div className="pb-6 md:hidden">
            <LinkGoBack
              href={isEditing ? `/invoice/${defaultValues?.id}` : "/"}
              onClick={handleCloseForm}
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
                    disabled={isEditing}
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

            <div className="mt-12 mb-6">
              <h2 className="mb-6 text-xl font-bold text-[#777f98] dark:text-white">
                items list (optional)
              </h2>

              {fields.length > 0 && (
                <div className="mb-10 flex flex-col gap-6 space-y-10">
                  {fields?.map((field, i) => (
                    <div key={field.uuid}>
                      <LabelTextField
                        label="item name"
                        isRequiredField
                        errorMessage={errors.items?.[i]?.name?.message}
                      >
                        <TextField
                          type="text"
                          {...register(`items.${i}.name` as const)}
                        />
                      </LabelTextField>

                      <div className="mt-6 flex items-center gap-3 [&_>_label]:max-w-fit">
                        <LabelTextField
                          label="Qty."
                          isRequiredField
                          errorMessage={errors.items?.[i]?.quantity?.message}
                        >
                          <TextField
                            type="number"
                            {...register(`items.${i}.quantity` as const)}
                          />
                        </LabelTextField>

                        <LabelTextField
                          label="price"
                          isRequiredField
                          errorMessage={errors.items?.[i]?.price?.message}
                        >
                          <TextField
                            type="number"
                            {...register(`items.${i}.price` as const)}
                          />
                        </LabelTextField>

                        <LabelTextField label="total" isRequiredField>
                          <TextField
                            type="text"
                            readOnly
                            value={formatPrice(getRealTimeTotalPrice(i))}
                          />
                        </LabelTextField>

                        <button
                          type="button"
                          title="delete item for list item invoice"
                          className="bottom-0 flex h-12 items-center justify-center self-end px-2"
                          onClick={() => handleRemoveItem(i)}
                        >
                          <BiTrash className="h-5 w-5 fill-shipCove" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              <button
                className="flex h-12 w-full items-center justify-center gap-2 rounded-[20px] bg-offWhite font-bold text-shipCove dark:bg-ebony dark:text-white"
                onClick={handleAddItem}
                type="button"
              >
                <BiPlus />
                add new item
              </button>
            </div>

            <div
              className={clsx(
                "absolute -left-6 flex w-[calc(100%_+_48px)] flex-wrap-reverse items-center justify-center gap-3 bg-transparent dark:bg-mirage2 px-6 py-6 md:p-[1.5rem_1.5rem_0] md:static md:w-auto md:bg-transparent md:px-0",
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
                  onClick={handleCloseForm}
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
                    onClick={handleCloseForm}
                  >
                    discard
                  </button>
                ) : (
                  <button
                    type="submit"
                    title="button save invoice as draft"
                    className="h-12 rounded-3xl bg-otherDark px-6 text-xs font-bold text-white transition-all first-letter:capitalize hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
                    disabled={createNewInvoiceMutation.isLoading}
                  >
                    save as draft
                  </button>
                )}
                <button
                  type="submit"
                  title="button save invoice as pending"
                  className="h-12 rounded-3xl bg-purple px-6 text-xs font-bold text-white transition-all first-letter:capitalize hover:bg-heliotrope disabled:cursor-not-allowed disabled:opacity-50"
                  ref={refButtonSaveAndSend}
                  disabled={createNewInvoiceMutation.isLoading}
                >
                  save & send
                </button>
              </div>
            </div>
          </form>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
