"use client";

import * as Dialog from "@radix-ui/react-dialog";

type ModalConfirmDeleteInvoiceProps = {
	shortId: string;
	isOpen: boolean;
	isDeleteLoading?: boolean;
	// eslint-disable-next-line no-unused-vars
	handleDeleteInvoice: (...args: any) => any;
};

export function ModalConfirmDeleteInvoice({
	shortId,
	handleDeleteInvoice,
	isDeleteLoading = false,
}: ModalConfirmDeleteInvoiceProps) {
	return (
		<Dialog.Root>
			<Dialog.Trigger
				type="button"
				title="delete invoice"
				className="h-12 rounded-3xl bg-burntSienna px-6 text-xs font-bold text-white transition-opacity first-letter:capitalize hover:opacity-80"
			>
				delete
			</Dialog.Trigger>
			<Dialog.DialogPortal>
				<Dialog.Overlay className="fixed inset-0 bg-overlay backdrop-blur-sm transition-all duration-150 data-[state=open]:animate-fade-in" />

				<Dialog.Content className="duration-250 fixed bottom-0 left-0 z-10 w-full rounded-t-lg bg-offWhite px-8 py-12 transition-transform duration-300 data-[state=open]:animate-fade-in dark:bg-mirage sm:bottom-auto sm:left-1/2 sm:top-1/2 sm:max-w-md sm:origin-center sm:-translate-x-1/2 sm:-translate-y-1/2 sm:rounded-lg sm:p-12 sm:shadow-sm">
					<h1 className="mb-5 text-3xl font-bold text-black dark:text-white">
						Confirm Deletion
					</h1>
					<p className="mb-6 text-sm text-shipCove">
						Are you sure you want to delete invoice&nbsp;
						<span className="font-bold uppercase">#{shortId}?</span> This action
						cannot be undone.
					</p>

					<div className="flex w-full items-center justify-end gap-3">
						<Dialog.Close
							type="button"
							title="close modal delete invoice"
							className="h-12 rounded-3xl bg-slate-100 px-6 text-xs font-bold text-shipCove transition-all first-letter:capitalize hover:bg-selago dark:bg-ebony dark:hover:opacity-90"
						>
							cancel
						</Dialog.Close>
						<button
							type="button"
							title="button confirm delete invoice"
							className="h-12 rounded-3xl bg-burntSienna px-6 text-xs font-bold text-white transition-opacity first-letter:capitalize disabled:cursor-not-allowed disabled:opacity-50 hover:opacity-80"
							onClick={handleDeleteInvoice}
							disabled={isDeleteLoading}
						>
							delete
						</button>
					</div>
				</Dialog.Content>
			</Dialog.DialogPortal>
		</Dialog.Root>
	);
}
