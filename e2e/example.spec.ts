import { expect, Page, test } from "@playwright/test";
import { checkA11y, injectAxe } from "axe-playwright";

export async function testA11y(page: Page) {
  await page.screenshot({ path: "__reports__/screenshots/checkA11y.png" });
  await injectAxe(page);
  await checkA11y(page);
}

export async function login(page: Page) {
  const email = "test.user_1@example.com";
  const password = "xxx-xxxxxxxxxx";
  await page.keyboard.type("Hello World!");
  await page.locator('role=textbox[name="メールアドレス"]').fill(email);
  await page.locator('role=textbox[name="パスワード"]').fill(password);
  await page.click('role=button[name="ログイン"]');
}

export async function gotoUsers(page: Page) {
  const region = page.locator('role=region[name="ユーザー一覧"]');
  const link = await region.locator("role=link");
  await link.click();
  await page.waitForNavigation();
  await expect(page.url()).toBe("http://localhost:3000/users");
}

export async function gotoUser(page: Page) {
  const link = page
    .locator('role=row[name="test.user_0"]')
    .locator("role=link");
  await link.click();
  await page.waitForNavigation();
  await expect(page.url()).toBe("http://localhost:3000/users/0");
}

export async function gotoEditUser(page: Page) {
  const button = page.locator('role=button[name="編集する"]');
  await button.click();
  await page.waitForNavigation();
  await expect(page.url()).toBe("http://localhost:3000/users/0/edit");
}

export async function editUser(page: Page) {
  await expect(page.locator('role=heading[name="ユーザー編集"]')).toBeTruthy();
  const button = page.locator('role=button[name="送信する"]');
  await button.click();
}

export async function expectAlert(page: Page) {
  await page.waitForNavigation();
  await expect(page.url()).toBe("http://localhost:3000/users/0");
  await expect(
    page.locator('role=alert[name="ユーザーの編集に成功しました"]')
  ).toBeTruthy();
}

test("should navigate to the about page", async ({ page }) => {
  await page.goto("/");
  await login(page);
  await gotoUsers(page);
  await gotoUser(page);
  await gotoEditUser(page);
  await testA11y(page);
  await editUser(page);
  await expectAlert(page);
});
