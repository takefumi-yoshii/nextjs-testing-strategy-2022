import { ComponentMeta, ComponentStoryObj } from "@storybook/react";
import { HeadGroup } from "./HeadGroup";

type T = typeof HeadGroup;
type Story = ComponentStoryObj<T>;

export default {
  component: HeadGroup,
} as ComponentMeta<T>;

export const Default: Story = {
  args: { title: "タイトル", children: <button>+1</button> },
};
