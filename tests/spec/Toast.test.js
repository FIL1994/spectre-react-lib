import React from "react";
import { render } from "react-testing-library";
import { Toast } from "../../src/index";

describe("Toast", () => {
  test("renders without crashing", () => {
    render(<Toast />);
  });

  test("works well", () => {
    const { getByText } = render(
      <Toast primary centered>
        test
      </Toast>
    );

    getByText("test");
  });
});
