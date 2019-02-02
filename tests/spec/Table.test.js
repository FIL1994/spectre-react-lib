import React from "react";
import { render, fireEvent } from "react-testing-library";
import { Table } from "../../src/index";

describe("Table", () => {
  test("renders without crashing", () => {
    render(<Table />);
  });

  test("is working", () => {
    const onHeadingClick = jest.fn(() => {});

    const { getByText } = render(
      <Table striped hover centered>
        <Table.Head
          headings={["heading", ["heading2", "content"]]}
          onHeadingClick={onHeadingClick}
        />
        <Table.Body>
          <Table.Row />
        </Table.Body>
      </Table>
    );

    const heading = getByText("heading");
    fireEvent.click(heading);

    expect(onHeadingClick).toHaveBeenCalledTimes(1);

    const heading2 = getByText("heading2");
    fireEvent.click(heading2);

    expect(onHeadingClick).toHaveBeenCalledTimes(2);
  });
});
