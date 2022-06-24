import { ComponentMeta, ComponentStoryObj } from "@storybook/react";
import { BasicHeader } from "./BasicHeader";

type T = typeof BasicHeader;
type Story = ComponentStoryObj<T>;

export default {
  component: BasicHeader,
} as ComponentMeta<T>;

export const Default: Story = {};
