import React from "react";
import { storiesOf } from "@storybook/react";

import "spectre.css";
import { Button } from "../src";
import { withInfo } from "@storybook/addon-info";
import { withKnobs, text, select, boolean } from "@storybook/addon-knobs";

storiesOf("Button", module)
  .addDecorator(withInfo)
  .addDecorator(withKnobs)
  .add("basic", () => (
    <div style={{ margin: 20 }}>
      <Button
        children={text("children", "Button")}
        className={text("className", "")}
        small={boolean("small", false)}
        large={boolean("large", false)}
        block={boolean("block", false)}
        primary={boolean("primary", false)}
        success={boolean("success", false)}
        error={boolean("error", false)}
        link={boolean("link", false)}
        loading={boolean("loading", false)}
        centered={boolean("centered", false)}
        inputGroup={boolean("inputGroup", false)}
        disabled={boolean("disabled", false)}
        size={select("size", {
          "": "",
          1: 1,
          2: 2,
          3: 3,
          4: 4,
          5: 5,
          6: 6,
          7: 7,
          8: 8,
          9: 9,
          10: 10,
          11: 11,
          12: 12
        })}
        as={text("as", undefined)}
      />
    </div>
  ))
  .add("group", () => (
    <div style={{ margin: 20 }}>
      <Button.Group
        className={text("className", "")}
        block={boolean("block", false)}
      >
        <Button>Button 1</Button>
        <Button>Button 2</Button>
        <Button>Button 3</Button>
      </Button.Group>
    </div>
  ));
