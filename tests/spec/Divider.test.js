import React from "react";
import { render } from "react-testing-library";
import { Divider } from "../../src/index";

describe("Divider", () => {
  test("renders without crashing", () => {
    render(<Divider />);
  });

  test("size prop works", () => {
    const { container } = render(<Divider size="4" />);

    expect(container.querySelector(".col-4")).not.toBeNull();
  });
});
