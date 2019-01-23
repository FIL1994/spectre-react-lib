import React from "react";
import ReactDOM from "react-dom";
import { Page } from "../../src/index";

describe("Page", () => {
  test("renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(<Page />, div);
    ReactDOM.unmountComponentAtNode(div);
  });
});
