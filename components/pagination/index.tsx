"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { cn } from "@/lib/utils";

import {
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  Pagination as ShadCnPagination,
} from "@/components/ui/pagination";

interface PaginationProps {
  data: any[];
  totalCount: number;
  limit: number;
  className?: string;
  scroll?: boolean;
  paginationCallback?: () => void;
}

const Pagination = ({ data, totalCount, limit, className, scroll = true, paginationCallback }: PaginationProps) => {
  const searchParams = useSearchParams();
  const searchParamsUrl = new URLSearchParams(searchParams.toString());
  const paginationCount = Math.ceil(totalCount / limit);
  const router = useRouter();
  const page = Number(searchParamsUrl.get("page")) || 1;
  const pathname = usePathname();

  const fetchSpecificPage = (page: number) => {
    if (page === 1) {
      searchParamsUrl.delete("page");
    } else {
      searchParamsUrl.set("page", String(page));
    }

    router.push(`${pathname}?${searchParamsUrl.toString()}`, { scroll });

    if (paginationCallback) {
      paginationCallback();
    }
  };

  const renderPaginationItems = () => {
    const items = [];
    for (let i = 1; i <= paginationCount; i++) {
      if (
        i === 1 ||
        i === page ||
        i === page - 1 ||
        i === page + 1 ||
        i === paginationCount ||
        i === page - 2 ||
        i === page + 2
      ) {
        items.push(
          <PaginationItem key={i}>
            <PaginationLink
              className={cn(
                "cursor-pointer",
                page === i && "pointer-events-none hover:bg-transparent cursor-not-allowed opacity-80"
              )}
              onClick={() => fetchSpecificPage(i)}
              isActive={page === i}
            >
              {i}
            </PaginationLink>
          </PaginationItem>
        );
      } else if (i === page - 3 || i === page + 3) {
        items.push(
          <PaginationItem key={i}>
            <PaginationEllipsis />
          </PaginationItem>
        );
      }
    }
    return items;
  };

  return data.length > 0 ? (
    <ShadCnPagination className={cn("mt-10", className)}>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            className={cn(
              "cursor-pointer",
              page === 1 && "pointer-events-none hover:bg-transparent cursor-not-allowed opacity-50"
            )}
            onClick={() => (page === 1 ? undefined : fetchSpecificPage(page - 1))}
          />
        </PaginationItem>
        {renderPaginationItems()}
        <PaginationItem>
          <PaginationNext
            className={cn(
              "cursor-pointer",
              page === paginationCount && "pointer-events-none hover:bg-transparent cursor-not-allowed opacity-50"
            )}
            onClick={() => (page === paginationCount ? undefined : fetchSpecificPage(page + 1))}
          />
        </PaginationItem>
      </PaginationContent>
    </ShadCnPagination>
  ) : null;
};

export default Pagination;

