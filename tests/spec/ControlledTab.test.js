import React from "react";
import { render, fireEvent } from "react-testing-library";
import { ControlledTab } from "../../src/index";

describe("Controlled Tab", () => {
  test("renders without crashing", () => {
    render(<ControlledTab />);
  });

  test("renders options", () => {
    const { getByText } = render(
      <ControlledTab
        options={[{ label: "label", value: "test", render: () => "test" }]}
      />
    );

    getByText("label");
  });

  test("handles click", () => {
    const { getByText } = render(
      <ControlledTab
        options={[
          {
            label: "Option 1",
            value: "1",
            render: () => <div>render 1</div>
          },
          {
            label: "Option 2",
            value: "2",
            render: () => <div>render 2</div>
          }
        ]}
        defaultActive="2"
      />
    );

    getByText("render 2");
    const option1Tab = getByText("Option 1");
    fireEvent.click(option1Tab);
    getByText("render 1");
  });
});
