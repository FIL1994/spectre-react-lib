import React from "react";
import ReactDOM from "react-dom";
import { Pagination } from "../../src/index";

describe("Pagination", () => {
  test("renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(<Pagination onClick={() => {}} totalPages={3} />, div);
    ReactDOM.unmountComponentAtNode(div);
  });
});
