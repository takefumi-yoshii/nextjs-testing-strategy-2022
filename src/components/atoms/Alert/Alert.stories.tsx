import { ComponentMeta, ComponentStoryObj } from "@storybook/react";
import { Alert } from "./Alert";

type T = typeof Alert;
type Story = ComponentStoryObj<T>;

export default {
  component: Alert,
} as ComponentMeta<T>;

export const Success: Story = {
  args: { children: "作成しました", theme: "success" },
};

export const Fail: Story = {
  args: { children: "エラーが発生しました", theme: "fail" },
};
