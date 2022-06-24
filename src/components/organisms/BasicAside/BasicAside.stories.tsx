import { ComponentMeta, ComponentStoryObj } from "@storybook/react";
import { BasicAside } from "./BasicAside";

type T = typeof BasicAside;
type Story = ComponentStoryObj<T>;

export default {
  component: BasicAside,
} as ComponentMeta<T>;

export const Default: Story = {};
