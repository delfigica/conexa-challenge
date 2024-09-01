"use client";
import React, { useState } from "react";
import "./pagination.css";

type props = {
  prevPage: () => void;
  nextPage: () => void;
  changePage: (page: number) => void;
  totalPages: number;
  currentPage: number;
};

export const Pagination = ({
  prevPage,
  nextPage,
  totalPages,
  changePage,
  currentPage,
}: props) => {
  const renderPageNumber = (page: number) => (
    <p
      key={page}
      className={`pagination-number-page ${
        currentPage === page ? "active" : ""
      }`}
      onClick={() => changePage(page)}
    >
      {page}
    </p>
  );

  const renderEllipsis = () => <p className="ellipsis">...</p>;

  const pageNumbers = () => {
    const pages = [];
    pages.push(renderPageNumber(1));

    if (currentPage > 4) {
      pages.push(renderEllipsis());
    }

    for (
      let i = Math.max(2, currentPage - 2);
      i <= Math.min(totalPages - 1, currentPage + 2);
      i++
    ) {
      pages.push(renderPageNumber(i));
    }

    if (currentPage < totalPages - 2) {
      pages.push(renderEllipsis());
    }

    pages.push(renderPageNumber(totalPages));
    return pages;
  };
  return (
    <div className="pagination">
      <button
        className="pagination-btn"
        onClick={prevPage}
        disabled={currentPage === 1}
      >
        prev
      </button>
      <div className="pagination-items-container">{pageNumbers()}</div>
      <button
        className="pagination-btn"
        onClick={nextPage}
        disabled={currentPage === totalPages}
      >
        next
      </button>
    </div>
  );
};
