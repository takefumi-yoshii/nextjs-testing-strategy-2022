import { ComponentMeta, ComponentStoryObj } from "@storybook/react";
import { Error } from "./Error";

type T = typeof Error;
type Story = ComponentStoryObj<T>;

export default {
  component: Error,
  args: { message: "システムエラーが発生しました", status: 500 },
} as ComponentMeta<T>;

export const Default: Story = {};
