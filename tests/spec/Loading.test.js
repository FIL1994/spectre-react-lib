import React from "react";
import { render } from "react-testing-library";
import { Loading } from "../../src/index";

describe("Loading", () => {
  test("renders without crashing", () => {
    render(<Loading />);
  });
});
