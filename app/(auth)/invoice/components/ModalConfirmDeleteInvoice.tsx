"use client";

import React from "react";
import clsx from "clsx";
import Portal from "@/app/components/Portal";
import useModal from "@/app/hooks/useModal";

type ModalConfirmDeleteInvoiceProps = {
  shortId: string;
  isOpen: boolean;
  onClose: () => void;
  onClick: (params: any) => any;
};

export default function ModalConfirmDeleteInvoice({
  shortId,
  isOpen,
  onClick,
  onClose,
}: ModalConfirmDeleteInvoiceProps) {
  const overlayRef = React.useRef<HTMLDivElement | null>(null);

  useModal({
    refToCloseModalOnClick: overlayRef,
    onClose,
    isOpen,
    blockingScrollingPage: true,
  });

  return (
    <Portal>
      <div
        ref={overlayRef}
        className={clsx(
          "inset fixed z-50 h-screen w-screen bg-overlay transition-all duration-150",
          {
            "invisible opacity-0": !isOpen,
            "pointer-events-auto visible opacity-100": isOpen,
          }
        )}
      >
        <div
          role="dialog"
          className={clsx(
            "duration-250 absolute bottom-0 left-0 sm:left-1/2 sm:top-1/2 w-full origin-bottom sm:origin-center sm:-translate-x-1/2 sm:-translate-y-1/2 overflow-hidden sm:rounded-lg bg-offWhite px-8 py-12 sm:p-12 transition-transform duration-300 dark:bg-mirage sm:max-w-md sm:bottom-auto",
            {
              "scale-0": !isOpen,
              "scale-100": isOpen,
            }
          )}
        >
          <h1 className="mb-5 text-3xl font-bold text-black dark:text-white">
            Confirm Deletion
          </h1>
          <p className="mb-6 text-shipCove text-sm">
            Are you sure you want to delete invoice&nbsp;
            <span className="font-bold uppercase">#{shortId}?</span> This action
            cannot be undone.
          </p>

          <div className="flex w-full items-center justify-end gap-3">
            <button
              type="button"
              title="close modal delete invoice"
              className="h-12 rounded-3xl bg-slate-100 px-6 text-xs font-bold text-shipCove transition-all first-letter:capitalize hover:bg-selago dark:bg-ebony dark:hover:opacity-90"
              onClick={onClose}
            >
              cancel
            </button>
            <button
              type="button"
              title="button confirm delete invoice"
              className="h-12 rounded-3xl bg-burntSienna px-6 text-xs font-bold text-white transition-opacity first-letter:capitalize hover:opacity-80"
              onClick={onClick}
            >
              delete
            </button>
          </div>
        </div>
      </div>
    </Portal>
  );
}
