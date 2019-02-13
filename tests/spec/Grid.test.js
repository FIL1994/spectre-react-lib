import React from "react";
import { render } from "react-testing-library";
import { Grid } from "../../src/index";

describe("Grid", () => {
  test("renders without crashing", () => {
    render(<Grid />);
  });

  test("gapless prop works", () => {
    const { container } = render(<Grid gapless />);

    expect(container.querySelector(".col-gapless")).not.toBeNull();
  });

  describe("Column", () => {
    test("renders without crashing", () => {
      render(<Grid.Column width="4" />);
    });
  });
});
