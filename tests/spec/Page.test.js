import React from "react";
import { render } from "react-testing-library";
import { Page } from "../../src/index";

describe("Page", () => {
  test("renders without crashing", () => {
    render(<Page />);
  });

  test("props work", () => {
    const { container } = render(<Page centered />);

    expect(container.querySelector(".centered")).not.toBeNull();
  });
});
