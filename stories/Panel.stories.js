import React from "react";
import { storiesOf } from "@storybook/react";

import "spectre.css";
import { Panel } from "../src";
import { withInfo } from "@storybook/addon-info";
import { withKnobs, text, select, boolean } from "@storybook/addon-knobs";

storiesOf("Panel", module)
  .addDecorator(withInfo)
  .addDecorator(withKnobs)
  .add("basic", () => (
    <div style={{ margin: 20 }}>
      <Panel
        className={text("className", "")}
        title={text("title", "Title")}
        children={text("children", "content")}
        footer={text("footer", "Footer")}
      />
    </div>
  ));
