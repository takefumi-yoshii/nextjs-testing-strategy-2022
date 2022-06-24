import { errors } from "@/errors";
import { createPostHandler, postFactory } from "@/services/api/posts/mock";
import { PortalContextDecorator } from "@/tests/storybook";
import { ComponentMeta, ComponentStoryObj } from "@storybook/react";
import { userEvent, within } from "@storybook/testing-library";
// eslint-disable-next-line
import { ByRoleMatcher, ByRoleOptions } from "@testing-library/react";
import { PostsNew } from "./PostsNew";

type T = typeof PostsNew;
type Story = ComponentStoryObj<T>;

export default {
  component: PostsNew,
  decorators: [PortalContextDecorator],
  args: { post: postFactory(1) },
  excludeStories: /.*Data$/,
} as ComponentMeta<T>;

export const Default: Story = {
  storyName: "投稿作成",
};

export const actualData = {
  title: "新しいタイトル",
  author: "takepepe",
};

export async function typeData(
  getByRole: (role: ByRoleMatcher, options: ByRoleOptions) => HTMLElement
) {
  const title = getByRole("textbox", { name: "タイトル" });
  const author = getByRole("textbox", { name: "著者" });
  await userEvent.clear(title);
  await userEvent.clear(author);
  await userEvent.type(title, actualData.title);
  await userEvent.type(author, actualData.author);
}

export const SucceedPost: Story = {
  storyName: "正常入力値で送信した場合",
  parameters: { msw: { handlers: [createPostHandler()] } },
  play: async ({ canvasElement }) => {
    const { getByRole } = within(canvasElement);
    await typeData(getByRole);
    await userEvent.click(getByRole("button", { name: "送信する" }));
  },
};

export const ServerError: Story = {
  storyName: "エラーが返ってきた場合",
  parameters: {
    msw: { handlers: [createPostHandler({ err: errors["INTERNAL_SERVER"] })] },
  },
  play: async ({ canvasElement }) => {
    const { getByRole } = within(canvasElement);
    await typeData(getByRole);
    await userEvent.click(getByRole("button", { name: "送信する" }));
  },
};
