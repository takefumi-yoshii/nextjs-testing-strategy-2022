import { expect, Page, test } from "@playwright/test";
import { checkA11y, injectAxe } from "axe-playwright";

export async function login(page: Page) {
  const email = "test.user_1@example.com";
  const password = "xxx-xxxxxxxxxx";
  await page.goto("/");
  await injectAxe(page);
  await page.keyboard.type("Hello World!");
  await page.locator('role=textbox[name="メールアドレス"]').fill(email);
  await page.locator('role=textbox[name="パスワード"]').fill(password);
  await page.click('role=button[name="ログイン"]');
}

test("should navigate to the about page", async ({ page }) => {
  await login(page);
  await checkA11y(page);
  await expect(page.locator('role=heading[name="ユーザー一覧"]')).toHaveText(
    "ユーザー一覧"
  );
});
