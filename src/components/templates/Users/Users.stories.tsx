import { usersFactory } from "@/services/api.example.com/users/mock";
import { ComponentMeta, ComponentStoryObj } from "@storybook/react";
import { Users } from "./Users";

type T = typeof Users;
type Story = ComponentStoryObj<T>;

export default {
  component: Users,
} as ComponentMeta<T>;

export const Default: Story = {
  storyName: "ユーザー一覧",
  args: { users: usersFactory(10) },
};
