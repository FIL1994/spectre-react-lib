import React from "react";
import { render } from "react-testing-library";
import { EmptyState } from "../../src/index";

describe("Empty State", () => {
  test("renders without crashing", () => {
    render(<EmptyState />);
  });

  test("props work", () => {
    render(<EmptyState className="test" icon="check" />);
  });
});
