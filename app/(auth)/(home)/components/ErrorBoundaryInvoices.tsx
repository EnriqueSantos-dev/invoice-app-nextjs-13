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
            <div className="w-full p-8 rounded-lg shadow-md flex flex-col gap-3">
              <div className="flex gap-3 items-center">
                <MdError className="fill-burntSienna" />
                <p className="text-burntSienna text-sm font-semibold">
                  Ops!! Error on loading invoices.
                </p>
              </div>

              <div className="flex flex-col gap-2 items-start">
                <p>Reset error by clicking on button in</p>
                <button
                  className="rounded px-4 py-1 bg-burntSienna text-white font-bold text-sm"
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
