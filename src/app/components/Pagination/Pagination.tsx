"use client";
import React, { useState } from "react";
import "./pagination.css";

type props = {
  prevPage: () => void; // Function to go to the previous page
  nextPage: () => void; // Function to go to the next page
  changePage: (page: number) => void; // Function to change to a specific page
  totalPages: number; // Total number of pages
  currentPage: number; // The current active page
};

export const Pagination = ({
  prevPage,
  nextPage,
  totalPages,
  changePage,
  currentPage,
}: props) => {
  // Function to render a page number
  const renderPageNumber = (page: number) => (
    <p
      key={page}
      className={`pagination-number-page ${
        currentPage === page ? "active" : ""
      }`}
      onClick={() => changePage(page)} // Change to the clicked page
    >
      {page}
    </p>
  );

  // Function to render an ellipsis ("...")
  const renderEllipsis = () => <p className="ellipsis">...</p>;

  // Function to generate the page numbers to be displayed
  const pageNumbers = () => {
    const pages = [];
    pages.push(renderPageNumber(1)); // Always show the first page

    // If the current page is beyond the 4th page, show an ellipsis after the first page
    if (currentPage > 4) {
      pages.push(renderEllipsis());
    }

    // Show the pages around the current page, ensuring they are within the valid range
    for (
      let i = Math.max(2, currentPage - 2); // Start at the current page minus 2, but not before page 2
      i <= Math.min(totalPages - 1, currentPage + 2); // End at the current page plus 2, but not after the last page
      i++
    ) {
      pages.push(renderPageNumber(i));
    }

    // If the current page is not close to the last page, show an ellipsis before the last page
    if (currentPage < totalPages - 2) {
      pages.push(renderEllipsis());
    }

    pages.push(renderPageNumber(totalPages)); // Always show the last page
    return pages;
  };
  return (
    <div className="pagination">
      <button
        data-testid="btn-prev"
        className="pagination-btn"
        onClick={prevPage}
        disabled={currentPage === 1} // Disable the "prev" button if on the first page
      >
        prev
      </button>
      <div className="pagination-items-container">{pageNumbers()}</div>
      <button
        data-testid="btn-next"
        className="pagination-btn"
        onClick={nextPage}
        disabled={currentPage === totalPages} // Disable the "next" button if on the last page
      >
        next
      </button>
    </div>
  );
};
