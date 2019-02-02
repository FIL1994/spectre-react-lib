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

  test("corners call onClick handlers", () => {
    const topLeft = jest.fn();
    const topRight = jest.fn();
    const bottomLeft = jest.fn();
    const bottomRight = jest.fn();
    const { container } = render(
      <Parallax
        topLeft={topLeft}
        topRight={topRight}
        bottomLeft={bottomLeft}
        bottomRight={bottomRight}
      />
    );

    const topLeftElement = container.querySelector(".parallax-top-left");
    fireEvent.click(topLeftElement);
    expect(topLeft).toHaveBeenCalled();

    const topRightElement = container.querySelector(".parallax-top-right");
    fireEvent.click(topRightElement);
    expect(topRight).toHaveBeenCalled();

    const bottomLeftElement = container.querySelector(".parallax-bottom-left");
    fireEvent.click(bottomLeftElement);
    expect(bottomLeft).toHaveBeenCalled();

    const bottomRightElement = container.querySelector(
      ".parallax-bottom-right"
    );
    fireEvent.click(bottomRightElement);
    expect(bottomRight).toHaveBeenCalled();
  });

  test("bottomRight gets called on Enter", () => {
    const bottomRightMock = jest.fn();
    const { container } = render(<Parallax bottomRight={bottomRightMock} />);

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
