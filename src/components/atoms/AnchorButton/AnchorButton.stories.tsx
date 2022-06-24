import { ComponentMeta, ComponentStoryObj } from "@storybook/react";
import { AnchorButton } from "./AnchorButton";

type T = typeof AnchorButton;
type Story = ComponentStoryObj<T>;

export default {
  component: AnchorButton,
  args: { children: "送信する" },
} as ComponentMeta<T>;

export const Default: Story = {};

export const Disabled: Story = {
  args: { disabled: true },
};
