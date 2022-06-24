import { ComponentMeta, ComponentStoryObj } from "@storybook/react";
import { userEvent, within } from "@storybook/testing-library";
import { ComponentPropsWithoutRef } from "react";
import { PostForm } from "./PostForm";

type T = typeof PostForm;
type Story = ComponentStoryObj<T>;

export const argsData: ComponentPropsWithoutRef<T> = {
  title: "投稿作成",
  onValid: async () => {},
};

export default {
  component: PostForm,
  args: argsData,
  excludeStories: /.*Data$/,
} as ComponentMeta<T>;

export const Default: Story = {
  storyName: "投稿作成",
};

export const EmptyPost: Story = {
  storyName: "空で送信した場合",
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole("button", { name: "送信する" }));
  },
};

export const EditUser: Story = {
  storyName: "投稿編集",
  args: {
    title: "投稿編集",
    initialValues: {
      title: "Lorem Ipsum",
      author: "takepepe",
    },
  },
};
