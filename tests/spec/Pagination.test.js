import React from "react";
import { render, fireEvent } from "react-testing-library";
import { Pagination } from "../../src/index";

describe("Pagination", () => {
  test("renders without crashing", () => {
    render(<Pagination onClick={() => {}} totalPages={3} />);
  });

  test("calls onClick", () => {
    const onClickMock = jest.fn(() => {});

    const { getByText } = render(
      <Pagination onClick={onClickMock} totalPages={10} activePage={2} />
    );

    const page1 = getByText("1");
    fireEvent.click(page1);

    expect(onClickMock).toHaveBeenCalled();
  });
});
