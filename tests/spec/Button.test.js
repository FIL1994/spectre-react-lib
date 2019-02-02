import React from "react";
import { render } from "react-testing-library";
import { Button } from "../../src/index";

describe("Button", () => {
  test("renders without crashing", () => {
    render(<Button />);
  });
});
