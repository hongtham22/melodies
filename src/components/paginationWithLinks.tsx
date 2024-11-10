"use client";

import { type ReactNode, useCallback } from "react";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { cn } from "@/lib/utils";

export interface PaginationWithLinksProps {
  totalPage: number; 
  page: number;
}

export function PaginationWithLinks({
  totalPage,
  page,
}: PaginationWithLinksProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const buildLink = useCallback(
    (newPage: number) => {
      const newSearchParams = new URLSearchParams(searchParams.toString());
      newSearchParams.set("page", String(newPage));
      return `${pathname}?${newSearchParams.toString()}`;
    },
    [searchParams, pathname]
  );

  const renderPageNumbers = () => {
    const items: ReactNode[] = [];
    const maxVisiblePages = 5;

    if (totalPage <= maxVisiblePages) {
      for (let i = 1; i <= totalPage; i++) {
        items.push(
          <PaginationItem key={i}>
            <PaginationLink href={buildLink(i)} isActive={page === i}
            className={cn(page === i ? "border border-primaryColorPink" : "border-b-2 border-transparent")}
            >
              {i}
            </PaginationLink>
          </PaginationItem>
        );
      }
    } else {
      items.push(
        <PaginationItem key={1}>
          <PaginationLink href={buildLink(1)} isActive={page === 1}
            className={cn(page === 1 ? "border border-primaryColorPink" : "border-b-2 border-transparent")}
            >
            1
          </PaginationLink>
        </PaginationItem>
      );

      if (page > 3) {
        items.push(
          <PaginationItem key="ellipsis-start">
            <PaginationEllipsis />
          </PaginationItem>
        );
      }

      const start = Math.max(2, page - 1);
      const end = Math.min(totalPage - 1, page + 1);

      for (let i = start; i <= end; i++) {
        items.push(
          <PaginationItem key={i}>
            <PaginationLink href={buildLink(i)} isActive={page === i}
            className={cn(page === i ? "border border-primaryColorPink" : "border-b-2 border-transparent")}
            >
              {i}
            </PaginationLink>
          </PaginationItem>
        );
      }

      if (page < totalPage - 2) {
        items.push(
          <PaginationItem key="ellipsis-end">
            <PaginationEllipsis />
          </PaginationItem>
        );
      }

      items.push(
        <PaginationItem key={totalPage}>
          <PaginationLink href={buildLink(totalPage)} isActive={page === totalPage}
           className={cn(page === totalPage ? "border border-primaryColorPink" : "border-b-2 border-transparent")}
          >
            {totalPage}
          </PaginationLink>
        </PaginationItem>
      );
    }

    return items;
  };

  return (
    <div className="flex flex-col md:flex-row items-center gap-3 w-full mt-2">
      <Pagination className={cn({ "md:justify-center": true })}>
        <PaginationContent className="max-sm:gap-0">
          <PaginationItem>
            <PaginationPrevious
              href={buildLink(Math.max(page - 1, 1))}
              aria-disabled={page === 1}
              tabIndex={page === 1 ? -1 : undefined}
              className={page === 1 ? "pointer-events-none opacity-50" : undefined}
            />
          </PaginationItem>
          {renderPageNumbers()}
          <PaginationItem>
            <PaginationNext
              href={buildLink(Math.min(page + 1, totalPage))}
              aria-disabled={page === totalPage}
              tabIndex={page === totalPage ? -1 : undefined}
              className={page === totalPage ? "pointer-events-none opacity-50" : undefined}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}