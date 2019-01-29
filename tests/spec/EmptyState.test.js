import React from "react";
import ReactDOM from "react-dom";
import { EmptyState } from "../../src/index";

describe("EmptyState", () => {
  test("renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(<EmptyState title="Empty State" />, div);
    ReactDOM.unmountComponentAtNode(div);
  });
});
