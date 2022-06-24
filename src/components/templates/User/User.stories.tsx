import { ComponentMeta, ComponentStoryObj } from "@storybook/react";
import { User } from "./User";

type T = typeof User;
type Story = ComponentStoryObj<T>;

export default {
  component: User,
  args: {
    user: {
      id: "1",
      name: "鈴木 次郎",
      email: "jiro.suzuki@example.com",
    },
  },
  excludeStories: /.*Data$/,
} as ComponentMeta<T>;

export const Default: Story = {
  storyName: "ユーザー詳細",
};
