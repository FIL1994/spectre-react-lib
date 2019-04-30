import React from "react";
import { storiesOf } from "@storybook/react";

import "spectre.css";
import { Divider } from "../src";
import { withInfo } from "@storybook/addon-info";
import { withKnobs, text, select } from "@storybook/addon-knobs";

storiesOf("Divider", module)
  .addDecorator(withInfo)
  .addDecorator(withKnobs)
  .add("basic", () => (
    <div style={{ margin: 20, width: "100%" }}>
      <Divider
        className={text("className", "")}
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
      />
    </div>
  ));
