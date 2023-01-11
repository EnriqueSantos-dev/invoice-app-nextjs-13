"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";

import { useFormActions } from "@/app/stores/form-store";
import { Invoice, Status } from "@/app/types";
import updateInvoiceStatus from "@/app/services/updateStatusInvoice";
import deleteInvoice from "@/app/services/deleteInvoice";
import ModalConfirmDeleteInvoice from "../components/ModalConfirmDeleteInvoice";
import FormInvoice from "@/app/components/form-invoice/FormInvoice";
import useInvalidateQueries from "@/app/hooks/useInvalidateQueries";

type ButtonsActionsProps = {
  invoice: Invoice;
};

export default function ButtonsActions({ invoice }: ButtonsActionsProps) {
  const router = useRouter();
  const { open } = useFormActions();
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

  function handleClickEdit() {
    open();
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
      <FormInvoice defaultValues={invoice} />

      <ModalConfirmDeleteInvoice
        shortId={invoice.shortId}
        isOpen={modalConfirmDeleteIsOpen}
        onClose={() => setModalConfirmDeleteIsOpen(false)}
        onClick={handleDelete}
      />
      <div className="fixed bottom-0 left-0 z-10 flex w-full items-center justify-center gap-3 bg-white py-4 dark:bg-mirage md:static md:z-0 md:w-auto md:justify-start md:bg-transparent md:py-0 md:dark:bg-transparent">
        <button
          type="button"
          title="edit invoice button"
          className="h-12 rounded-3xl bg-offWhite px-6 text-xs font-bold text-shipCove transition-all first-letter:capitalize hover:bg-selago dark:bg-ebony dark:hover:opacity-90"
          onClick={handleClickEdit}
        >
          edit
        </button>
        <button
          type="button"
          title="delete nvoice button"
          className="h-12 rounded-3xl bg-burntSienna px-6 text-xs font-bold text-white transition-opacity first-letter:capitalize hover:opacity-80"
          onClick={() => setModalConfirmDeleteIsOpen(true)}
        >
          delete
        </button>

        <button
          type="button"
          title="change status invoice button"
          className="h-12 rounded-3xl bg-purple px-6 text-xs font-bold text-white transition-opacity first-letter:capitalize hover:bg-heliotrope hover:opacity-80"
          onClick={handleChangeStatus}
        >
          {invoice.status === Status.PENDING
            ? "mark as paid"
            : "mark as pending"}
        </button>
      </div>
    </>
  );
}
