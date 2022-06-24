import { errors } from "@/errors";
import { createUserHandler } from "@/services/api/users/mock";
import { PortalContextDecorator } from "@/tests/storybook";
import { ComponentMeta, ComponentStoryObj } from "@storybook/react";
import { userEvent, within } from "@storybook/testing-library";
// eslint-disable-next-line
import { ByRoleMatcher, ByRoleOptions } from "@testing-library/react";
import { UsersNew } from "./UsersNew";

type T = typeof UsersNew;
type Story = ComponentStoryObj<T>;

export default {
  component: UsersNew,
  decorators: [PortalContextDecorator],
  excludeStories: /.*Data$/,
} as ComponentMeta<T>;

export const Default: Story = {
  storyName: "ユーザー作成",
};

export const actualData = {
  name: "鈴木 次郎",
  email: "jiro.suzuki@example.com",
};

export async function typeData(
  getByRole: (role: ByRoleMatcher, options: ByRoleOptions) => HTMLElement
) {
  await userEvent.type(
    getByRole("textbox", { name: "ユーザー名" }),
    actualData.name
  );
  await userEvent.type(
    getByRole("textbox", { name: "メールアドレス" }),
    actualData.email
  );
}

export const SucceedPost: Story = {
  storyName: "正常入力値で送信した場合",
  parameters: { msw: { handlers: [createUserHandler()] } },
  play: async ({ canvasElement }) => {
    const { getByRole } = within(canvasElement);
    await typeData(getByRole);
    await userEvent.click(getByRole("button", { name: "送信する" }));
  },
};

export const ServerError: Story = {
  storyName: "エラーが返ってきた場合",
  parameters: {
    msw: { handlers: [createUserHandler({ err: errors["INTERNAL_SERVER"] })] },
  },
  play: async ({ canvasElement }) => {
    const { getByRole } = within(canvasElement);
    await typeData(getByRole);
    await userEvent.click(getByRole("button", { name: "送信する" }));
  },
};
