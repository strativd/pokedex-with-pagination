import { useState } from "react";

type UsePaginationReturn = {
  currentPage: number;
  nextPage?: number;
  prevPage?: number;
  goToPage: (page: number) => void;
};

export const usePagination = (
  totalItems: number,
  itemsPerPage: number,
  initialPage = 1
): UsePaginationReturn => {
  const [currentPage, setCurrentPage] = useState(initialPage);

  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const nextPage = currentPage < totalPages ? currentPage + 1 : undefined;
  const prevPage = currentPage > 0 ? currentPage - 1 : undefined;

  const goToPage = (newPage: number) => {
    if (newPage < currentPage && prevPage == null) return;
    if (newPage > currentPage && nextPage == null) return;
    setCurrentPage(newPage);
  };

  return { currentPage, goToPage, nextPage, prevPage };
};
