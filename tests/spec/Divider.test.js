import React from "react";
import { render } from "react-testing-library";
import { Divider } from "../../src/index";

describe("Divider", () => {
  test("renders without crashing", () => {
    render(<Divider />);
  });
});
