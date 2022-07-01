import { ComponentMeta, ComponentStoryObj } from "@storybook/react";
import { Panel } from "./Panel";

type T = typeof Panel;
type Story = ComponentStoryObj<T>;

export default {
  component: Panel,
} as ComponentMeta<T>;

export const Default: Story = {
  args: { title: "タイトル", children: <button>+1</button> },
};
