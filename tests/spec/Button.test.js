import React from "react";
import { render } from "react-testing-library";
import { Button } from "../../src/index";

describe("Button", () => {
  test("renders without crashing", () => {
    render(<Button />);
  });

  test("className props work", () => {
    const { container } = render(
      <Button
        large
        block
        primary
        success
        error
        link
        loading
        centered
        inputGroup
      />
    );

    const notNull = query =>
      expect(container.querySelector(query)).not.toBeNull();

    notNull(".btn-lg");
    notNull(".btn-block");
    notNull(".btn-primary");
    notNull(".btn-success");
    notNull(".btn-error");
    notNull(".btn-link");
    notNull(".loading");
    notNull(".centered");
    notNull(".input-group-btn");

    const updateProps = props => render(<Button {...props} />, { container });

    updateProps({ small: true, disabled: true, size: 4 });
    notNull(".btn-sm");
    notNull(".disabled");
    notNull(".col-4");
  });

  describe("Group", () => {
    test("renders button", () => {
      const { container } = render(
        <Button.Group>
          <Button />
        </Button.Group>
      );

      const btn = container.querySelector(".btn-group button");

      expect(btn).not.toBeNull();
    });

    test("uses block class", () => {
      const { container } = render(
        <Button.Group block>
          <Button />
          <Button />
        </Button.Group>
      );

      const btnGroup = container.querySelector(".btn-group-block");

      expect(btnGroup).not.toBeNull();
    });
  });
});
