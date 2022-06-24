import { ComponentMeta, ComponentStoryObj } from "@storybook/react";
import { Login } from "./Login";

type T = typeof Login;
type Story = ComponentStoryObj<T>;

export default {
  component: Login,
} as ComponentMeta<T>;

export const Default: Story = {};
