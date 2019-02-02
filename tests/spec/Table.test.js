import React from "react";
import { render } from "react-testing-library";
import { Table } from "../../src/index";

describe("Table", () => {
  test("renders without crashing", () => {
    render(<Table headings={["heading"]} />);
  });
});
