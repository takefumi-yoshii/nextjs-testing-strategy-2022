import { ComponentMeta, ComponentStoryObj } from "@storybook/react";
import { Top } from "./Top";

type T = typeof Top;
type Story = ComponentStoryObj<T>;

export default {
  component: Top,
} as ComponentMeta<T>;

export const Default: Story = {};
