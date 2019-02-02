import React from "react";
import { render } from "react-testing-library";
import { Tab } from "../../src/index";

describe("Tab", () => {
  test("renders without crashing", () => {
    render(<Tab />);
  });

  test("props work", () => {
    const { container } = render(<Tab block />);

    expect(container.querySelector(".tab-block")).not.toBeNull();
  });
});
