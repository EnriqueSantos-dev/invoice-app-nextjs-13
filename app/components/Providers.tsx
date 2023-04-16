"use client";

import React from "react";
import { queryClient } from "@/lib/react-query";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { SessionProvider } from "next-auth/react";
import { ToastContainer } from "react-toastify";

type Props = {
  children: React.ReactNode;
};

export function Providers({ children }: Props) {
  return (
    <>
      <ToastContainer />
      <SessionProvider>
        <QueryClientProvider client={queryClient}>
          {children}
          <ReactQueryDevtools initialIsOpen={true} />
        </QueryClientProvider>
      </SessionProvider>
    </>
  );
}
