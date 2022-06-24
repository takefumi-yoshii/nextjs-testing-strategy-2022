import { ComponentMeta } from "@storybook/react";
import { Textbox } from "./Textbox";

export default {
  component: Textbox,
} as ComponentMeta<typeof Textbox>;

export const Default = {};

export const Spinbutton = {
  args: { type: "number" },
};
