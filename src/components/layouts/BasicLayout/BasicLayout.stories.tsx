import { ComponentMeta, ComponentStoryObj } from "@storybook/react";
import { BasicLayout } from "./BasicLayout";

type T = typeof BasicLayout;
type Story = ComponentStoryObj<T>;

export default {
  component: () => <>{BasicLayout(<main />)}</>,
} as ComponentMeta<T>;

export const Default: Story = {
  storyName: "ユーザー作成",
};
