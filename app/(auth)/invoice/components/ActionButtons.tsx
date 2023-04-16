"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { Invoice, Status } from "@/app/types";
import updateInvoiceStatus from "@/app/services/updateStatusInvoice";
import deleteInvoice from "@/app/services/deleteInvoice";
import { ModalConfirmDeleteInvoice } from "../components/ModalConfirmDeleteInvoice";
import { FormCreateOrEditInvoice } from "@/app/components";
import useInvalidateQueries from "@/app/hooks/useInvalidateQueries";
import clsx from "clsx";

type ButtonsActionsProps = {
  invoice: Invoice;
};

export function ButtonsActions({ invoice }: ButtonsActionsProps) {
  const router = useRouter();
  const [modalConfirmDeleteIsOpen, setModalConfirmDeleteIsOpen] =
    useState(false);
  const { invalidate } = useInvalidateQueries();
  const changeStatusMutation = useMutation({
    mutationFn: updateInvoiceStatus,
    onSuccess: () => onSuccessChangeStatusMutate(),
    onError: onErrorChangeStatusMutate,
  });

  const deleteInvoiceMutation = useMutation({
    mutationFn: deleteInvoice,
    onSuccess: () => onSuccessDeleteInvoiceMutate(),
    onError: onErrorDeleteInvoiceMutate,
  });

  function onSuccessChangeStatusMutate() {
    invalidate("getInvoiceById");
    toast.success("Status invoice updated successfully!");
  }

  function onErrorChangeStatusMutate() {
    toast.error(`Error on change status invoice, try again!`);
  }

  function onSuccessDeleteInvoiceMutate() {
    invalidate(["invoices", "getInvoicesCount"]);
    toast.success("Invoice has been deleted successfully!");
    setModalConfirmDeleteIsOpen(false);
    router.push("/");
  }

  function onErrorDeleteInvoiceMutate() {
    setModalConfirmDeleteIsOpen(false);
    toast.error("failed on delete invoice, try again!");
  }

  function handleChangeStatus() {
    changeStatusMutation.mutate({
      invoiceId: invoice.id,
      status:
        invoice.status === Status.PAID || invoice.status === Status.DRAFT
          ? Status.PENDING
          : Status.PAID,
    });
  }

  function handleDelete() {
    deleteInvoiceMutation.mutate({ invoiceId: invoice.id });
  }

  return (
    <>
      <div className="fixed bottom-0 left-0 z-10 flex w-full items-center justify-center gap-3 bg-white py-4 dark:bg-mirage md:static md:z-0 md:w-auto md:justify-start md:bg-transparent md:py-0 md:dark:bg-transparent">
        <FormCreateOrEditInvoice defaultValues={invoice} />

        <ModalConfirmDeleteInvoice
          shortId={invoice.shortId}
          isOpen={modalConfirmDeleteIsOpen}
          handleDeleteInvoice={handleDelete}
          isDeleteLoading={deleteInvoiceMutation.isLoading}
        />

        <button
          type="button"
          title="change status invoice button"
          className={clsx(
            "h-12 rounded-3xl bg-purple px-6 text-xs font-bold text-white transition-opacity first-letter:capitalize hover:bg-heliotrope hover:opacity-80",
            {
              "cursor-not-allowed": changeStatusMutation.isLoading,
            }
          )}
          onClick={handleChangeStatus}
        >
          {changeStatusMutation.isLoading && "Changing..."}
          {!changeStatusMutation.isLoading &&
            invoice.status === Status.PENDING &&
            "mark as paid"}
          {!changeStatusMutation.isLoading &&
            invoice.status === Status.PAID &&
            "mark as pending"}
        </button>
      </div>
    </>
  );
}
