import React from "react";
import ReactDOM from "react-dom";
import { render, fireEvent } from "react-testing-library";

import { Parallax } from "../../src/index";

describe("Parallax", () => {
  test("renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(<Parallax />, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  test("topLeft gets called on click", () => {
    const topLeftMock = jest.fn();
    const { container } = render(<Parallax topLeft={topLeftMock} />);

    const topLeftElement = container.querySelector(".parallax-top-left");
    fireEvent.click(topLeftElement);

    expect(topLeftMock).toHaveBeenCalled();
  });

  test("bottomRight gets called on Enter", () => {
    const bottomRightMock = jest.fn();
    const { container } = render(
      <Parallax bottomRight={bottomRightMock} />
    );

    const topLeftElement = container.querySelector(".parallax-bottom-right");
    fireEvent.focus(topLeftElement);
    fireEvent.keyPress(topLeftElement, {
      key: "Enter",
      keyCode: 13,
      which: 13
    });

    expect(bottomRightMock).toHaveBeenCalled();
  });
});
