import React from "react";
import { storiesOf } from "@storybook/react";

import "spectre.css";
import { Pagination } from "../src";
import { withInfo } from "@storybook/addon-info";
import { withKnobs, text, boolean, number } from "@storybook/addon-knobs";

storiesOf("Pagination", module)
  .addDecorator(withInfo)
  .addDecorator(withKnobs)
  .add("basic", () => (
    <div style={{ margin: 20 }}>
      <Pagination
        className={text("className", "")}
        activePage={number("activePage", 1)}
        centered={boolean("centered", false)}
        totalPages={number("totalPages", 3)}
        onClick={(event, activePage) => console.log("clicked", activePage)}
      />
    </div>
  ));
