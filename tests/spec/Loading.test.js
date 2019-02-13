import React from "react";
import { render } from "react-testing-library";
import { Loading } from "../../src/index";

describe("Loading", () => {
  test("renders without crashing", () => {
    render(<Loading />);
  });

  test("large prop works", () => {
    const { container } = render(<Loading large />);

    expect(container.querySelector(".loading-lg")).not.toBeNull();
  });
});
