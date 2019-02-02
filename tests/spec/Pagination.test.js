import React from "react";
import { render, fireEvent } from "react-testing-library";
import { Pagination } from "../../src/index";

describe("Pagination", () => {
  test("renders without crashing", () => {
    render(<Pagination onClick={() => {}} totalPages={3} />);
  });

  test("calls onClick", () => {
    const onClickMock = jest.fn(() => {});

    const { getByText, container } = render(
      <Pagination
        onClick={onClickMock}
        totalPages={10}
        activePage={2}
        centered
      />
    );

    const page1 = getByText("4");
    fireEvent.click(page1);

    fireEvent.click(container.querySelector(".page-item:last-of-type"));
    fireEvent.click(container.querySelector(".page-item:first-of-type"));

    expect(onClickMock).toHaveBeenCalled();
  });

  test("handles one page", () => {
    const { getByText, container } = render(
      <Pagination onClick={() => {}} totalPages={1} centered />
    );

    getByText("1");

    const pageItems = container.querySelectorAll(".page-item");
    expect(pageItems).toHaveLength(3);
  });
});
