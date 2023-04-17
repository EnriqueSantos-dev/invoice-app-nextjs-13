"use client";

import React from "react";
import { ErrorBoundary as ReactErrorBoundary } from "react-error-boundary";
import { QueryErrorResetBoundary } from "@tanstack/react-query";
import { MdError } from "react-icons/md";

export default function ErrorBoundary({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<QueryErrorResetBoundary>
			{({ reset }) => (
				<ReactErrorBoundary
					onReset={reset}
					fallbackRender={({ resetErrorBoundary }) => (
						<div className="flex w-full flex-col gap-3 rounded-lg p-8 shadow-md">
							<div className="flex items-center gap-3">
								<MdError className="fill-burntSienna" />
								<p className="text-sm font-semibold text-burntSienna">
									Ops!! Error on loading invoices.
								</p>
							</div>

							<div className="flex flex-col items-start gap-2">
								<p>Reset error by clicking on button in</p>
								<button
									className="rounded bg-burntSienna px-4 py-1 text-sm font-bold text-white"
									onClick={resetErrorBoundary}
								>
									Reset
								</button>
							</div>
						</div>
					)}
				>
					{children}
				</ReactErrorBoundary>
			)}
		</QueryErrorResetBoundary>
	);
}
