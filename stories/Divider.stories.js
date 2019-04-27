import React from "react";
import { storiesOf } from "@storybook/react";

import "spectre.css";
import { Divider } from "../src";
import { withInfo } from "@storybook/addon-info";

storiesOf("Divider", module)
  .addDecorator(withInfo)
  .add("basic", () => (
    <div style={{ margin: 20 }}>
      <Divider />
    </div>
  ));
