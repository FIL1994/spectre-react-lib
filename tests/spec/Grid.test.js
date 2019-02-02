import React from "react";
import { render } from "react-testing-library";
import { Grid } from "../../src/index";

describe("Grid", () => {
  test("renders without crashing", () => {
    render(<Grid />);
  });

  describe("Column", () => {
    test("renders without crashing", () => {
      render(<Grid.Column width="4" />);
    });
  });
});
