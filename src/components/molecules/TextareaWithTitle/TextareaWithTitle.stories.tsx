import { ComponentMeta, ComponentStoryObj } from "@storybook/react";
import { ComponentPropsWithoutRef } from "react";
import { TextareaWithTitle } from "./TextareaWithTitle";

type T = typeof TextareaWithTitle;
type Story = ComponentStoryObj<T>;

export const argsData: ComponentPropsWithoutRef<T> = {
  labelProps: { children: <>本文</> },
  textareaProps: { name: "title", rows: 10 },
};

export default {
  component: TextareaWithTitle,
  args: argsData,
  excludeStories: /.*Data$/,
} as ComponentMeta<T>;

export const Default: Story = {};

export const HasDescription: Story = {
  args: { description: "本文を入力してください" },
};

export const HasError: Story = {
  args: { error: "使用できない文字があります" },
};

export const FullProps: Story = {
  args: {
    ...HasError.args,
    ...HasDescription.args,
  },
};
