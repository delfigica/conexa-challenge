import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";

import { Pagination } from "../../../app/components/Pagination/Pagination";

describe("Pagination component", () => {
  const prevPageMock = jest.fn();
  const nextPageMock = jest.fn();
  const changePageMock = jest.fn();

  const setup = (currentPage: number, totalPages: number) => {
    render(
      <Pagination
        prevPage={prevPageMock}
        nextPage={nextPageMock}
        changePage={changePageMock}
        totalPages={totalPages}
        currentPage={currentPage}
      />
    );
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders correctly with first and last page always visible", () => {
    setup(1, 5);
    expect(screen.getByText("1")).toBeInTheDocument();
    expect(screen.getByText("5")).toBeInTheDocument();
  });

  test("prev button is disabled on the first page", () => {
    setup(1, 5);
    expect(screen.getByTestId("btn-prev")).toBeDisabled();
  });

  test("next button is disabled on the last page", () => {
    setup(5, 5);
    expect(screen.getByTestId("btn-next")).toBeDisabled();
  });

  test("clicking on next button triggers nextPage function", () => {
    setup(1, 5);
    fireEvent.click(screen.getByTestId("btn-next"));
    expect(nextPageMock).toHaveBeenCalled();
  });

  test("clicking on prev button triggers prevPage function", () => {
    setup(2, 5);
    fireEvent.click(screen.getByTestId("btn-prev"));
    expect(prevPageMock).toHaveBeenCalled();
  });

  test("clicking on a specific page triggers changePage function", () => {
    setup(1, 5);
    fireEvent.click(screen.getByText("3"));
    expect(changePageMock).toHaveBeenCalledWith(3);
  });

  test("shows ellipsis when pages are skipped", () => {
    setup(5, 10);
    expect(screen.getAllByText("...")).toHaveLength(2);
  });

  test("renders active class on the current page", () => {
    setup(3, 5);
    expect(screen.getByText("3")).toHaveClass("active");
  });
});
