import React from "react";
import { render } from "react-testing-library";
import { Panel } from "../../src/index";

describe("Panel", () => {
  test("renders without crashing", () => {
    render(<Panel />);
  });

  test("displays title and footer", () => {
    const { getByText } = render(<Panel title="title" footer="footer" />);

    getByText("title");
    getByText("footer");
  });
});
