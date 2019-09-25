import { configure, setAddon, addParameters } from "@storybook/react";
import { create } from "@storybook/theming";
import infoAddon from "@storybook/addon-info";

addParameters({
  options: {
    theme: create({
      base: "light",
      brandTitle: "spectre-react-lib",
      brandUrl: "https://github.com/FIL1994/spectre-react-lib"
    })
  }
});

setAddon(infoAddon);

configure(
  require.context("../stories", true, /\.stories\.(js|tsx|mdx)$/),
  module
);
