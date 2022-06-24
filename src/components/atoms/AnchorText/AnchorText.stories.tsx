import { ComponentMeta, ComponentStoryObj } from "@storybook/react";
import { AnchorText } from "./AnchorText";

type T = typeof AnchorText;
type Story = ComponentStoryObj<T>;

export default {
  component: AnchorText,
  args: { children: "送信する", href: "#" },
} as ComponentMeta<T>;

export const Default: Story = {};

export const HasArrow: Story = {
  args: { hasArrow: true },
};
