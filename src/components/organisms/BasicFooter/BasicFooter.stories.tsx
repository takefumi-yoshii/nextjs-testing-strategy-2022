import { ComponentMeta, ComponentStoryObj } from "@storybook/react";
import { BasicFooter } from "./BasicFooter";

type T = typeof BasicFooter;
type Story = ComponentStoryObj<T>;

export default {
  component: BasicFooter,
} as ComponentMeta<T>;

export const Default: Story = {};
