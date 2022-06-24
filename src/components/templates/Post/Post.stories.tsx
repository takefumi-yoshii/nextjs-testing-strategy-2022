import { postFactory } from "@/services/api.example.com/posts/mock";
import { ComponentMeta, ComponentStoryObj } from "@storybook/react";
import { Post } from "./Post";

type T = typeof Post;
type Story = ComponentStoryObj<T>;

export default {
  component: Post,
  args: {
    post: postFactory(1),
  },
  excludeStories: /.*Data$/,
} as ComponentMeta<T>;

export const Default: Story = {
  storyName: "投稿詳細",
};
