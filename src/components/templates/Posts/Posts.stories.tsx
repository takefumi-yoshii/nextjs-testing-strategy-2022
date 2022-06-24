import { postsFactory } from "@/services/api.example.com/posts/mock";
import { ComponentMeta, ComponentStoryObj } from "@storybook/react";
import { Posts } from "./Posts";

type T = typeof Posts;
type Story = ComponentStoryObj<T>;

export default {
  component: Posts,
} as ComponentMeta<T>;

export const Default: Story = {
  storyName: "投稿一覧",
  args: { posts: postsFactory(10) },
};
