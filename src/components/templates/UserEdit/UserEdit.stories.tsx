import { errors } from "@/errors";
import { updateUserHandler } from "@/services/api/users/[id]/mock";
import { PortalContextDecorator } from "@/tests/storybook";
import { ComponentMeta, ComponentStoryObj } from "@storybook/react";
import { userEvent, within } from "@storybook/testing-library";
// eslint-disable-next-line
import { ByRoleMatcher, ByRoleOptions } from "@testing-library/react";
import { UserEdit } from "./UserEdit";

type T = typeof UserEdit;
type Story = ComponentStoryObj<T>;

export default {
  component: UserEdit,
  decorators: [PortalContextDecorator],
  args: {
    user: {
      id: "1",
      name: "鈴木 次郎",
      email: "jiro.suzuki@example.com",
    },
  },
  excludeStories: /.*Data$/,
} as ComponentMeta<T>;

export const Default: Story = {
  storyName: "ユーザー編集",
};

export const actualData = {
  name: "鈴木 次郎",
  email: "jiro.suzuki@example.com",
};

export async function typeData(
  getByRole: (role: ByRoleMatcher, options: ByRoleOptions) => HTMLElement
) {
  const user = getByRole("textbox", { name: "ユーザー名" });
  const email = getByRole("textbox", { name: "メールアドレス" });
  await userEvent.clear(user);
  await userEvent.clear(email);
  await userEvent.type(user, actualData.name);
  await userEvent.type(email, actualData.email);
}

export const SucceedPost: Story = {
  storyName: "正常入力値で送信した場合",
  parameters: { msw: { handlers: [updateUserHandler()] } },
  play: async ({ canvasElement }) => {
    const { getByRole } = within(canvasElement);
    await typeData(getByRole);
    await userEvent.click(getByRole("button", { name: "送信する" }));
  },
};

export const ServerError: Story = {
  storyName: "エラーが返ってきた場合",
  parameters: {
    msw: { handlers: [updateUserHandler({ err: errors["INTERNAL_SERVER"] })] },
  },
  play: async ({ canvasElement }) => {
    const { getByRole } = within(canvasElement);
    await typeData(getByRole);
    await userEvent.click(getByRole("button", { name: "送信する" }));
  },
};
