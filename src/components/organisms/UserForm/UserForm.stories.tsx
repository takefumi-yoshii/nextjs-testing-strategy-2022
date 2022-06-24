import { ComponentMeta, ComponentStoryObj } from "@storybook/react";
import { userEvent, within } from "@storybook/testing-library";
import { ComponentPropsWithoutRef } from "react";
import { UserForm } from "./UserForm";

type T = typeof UserForm;
type Story = ComponentStoryObj<T>;

export const argsData: ComponentPropsWithoutRef<T> = {
  title: "ユーザー作成",
  onValid: async () => {},
};

export default {
  component: UserForm,
  args: argsData,
  excludeStories: /.*Data$/,
} as ComponentMeta<T>;

export const Default: Story = {
  storyName: "ユーザー作成",
};

export const EmptyPost: Story = {
  storyName: "空で送信した場合",
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole("button", { name: "送信する" }));
  },
};

export const InvalidInputs: Story = {
  storyName: "不正な文字列で送信した場合",
  play: async ({ canvasElement }) => {
    const { getByRole } = within(canvasElement);
    await userEvent.type(
      getByRole("textbox", { name: "ユーザー名" }),
      "鈴木 次郎"
    );
    await userEvent.type(
      getByRole("textbox", { name: "メールアドレス" }),
      "jiro"
    );
    await userEvent.click(getByRole("button", { name: "送信する" }));
  },
};

export const EditUser: Story = {
  storyName: "ユーザー編集",
  args: {
    title: "ユーザー編集",
    initialValues: {
      name: "鈴木 次郎",
      email: "jiro.suzuki@example.com",
    },
  },
};
