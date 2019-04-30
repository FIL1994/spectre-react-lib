import React from "react";
import { storiesOf } from "@storybook/react";

import "spectre.css";
import { EmptyState } from "../src";
import { withInfo } from "@storybook/addon-info";
import { withKnobs, text, select } from "@storybook/addon-knobs";

storiesOf("EmptyState", module)
  .addDecorator(withInfo)
  .addDecorator(withKnobs)
  .add("basic", () => (
    <div style={{ margin: 20 }}>
      <EmptyState
        className={text("className", "")}
        children={text("children", "No results found")}
        title={text("title", "Title")}
      />
    </div>
  ));
