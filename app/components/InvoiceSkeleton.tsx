"use client";

import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

export function InvoiceItemSkeleton() {
  return (
    <div className="flex min-h-[86px] w-full flex-col gap-4 rounded-lg border border-white bg-white p-4 outline-none ring-1 ring-transparent transition-colors duration-150 dark:border-ebony dark:bg-ebony md:flex-row md:justify-between md:py-6">
      <SkeletonTheme baseColor="#ccc" highlightColor="#999">
        <div className="flex items-center justify-between md:justify-start md:gap-6">
          <Skeleton containerClassName="w-16 md:h-3 md:[&_span]:h-3" />
          <Skeleton containerClassName="w-16 hidden md:inline-block md:[&_span]:h-3 md:h-3" />
          <Skeleton containerClassName="w-16 md:h-3 md:[&_span]:h-3  md:ml-20 " />
        </div>

        <div className="flex items-start justify-between md:items-center md:gap-5">
          <Skeleton containerClassName="hidden md:block h-10 w-32 md:h-3 md:[&_span]:h-3 [&_span]:w-32 md:[&_span]:w-20 [&_span]:h-3" />
          <Skeleton containerClassName="w-28 md:hidden" count={2} />
          <Skeleton containerClassName="h-10 w-32 [&_span]:w-32 [&_span]:h-10" />
        </div>
      </SkeletonTheme>
    </div>
  );
}
