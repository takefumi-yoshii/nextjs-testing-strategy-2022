import { ComponentMeta, ComponentStoryObj } from "@storybook/react";
import { ComponentPropsWithoutRef } from "react";
import { TextboxWithTitle } from "./TextboxWithTitle";

type T = typeof TextboxWithTitle;
type Story = ComponentStoryObj<T>;

export const argsData: ComponentPropsWithoutRef<T> = {
  labelProps: { children: <>お名前</> },
  textboxProps: { name: "name" },
};

export default {
  component: TextboxWithTitle,
  args: argsData,
  excludeStories: /.*Data$/,
} as ComponentMeta<T>;

export const Default: Story = {};

export const HasDescription: Story = {
  args: { description: "姓名を入力してください" },
};

export const HasError: Story = {
  args: { error: "入力エラーがあります" },
};

export const FullProps: Story = {
  args: {
    ...HasError.args,
    ...HasDescription.args,
  },
};
