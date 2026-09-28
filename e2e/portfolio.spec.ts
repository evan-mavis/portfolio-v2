import { expect, test } from "@playwright/test";

test("health endpoint reports ok", async ({ request }) => {
  const response = await request.get("/api/health");
  expect(response.ok()).toBe(true);
  expect(await response.json()).toMatchObject({ status: "ok" });
});

test("home page expands the tree and navigates to travel", async ({ page }) => {
  await page.goto("/");
  await expect(page).toHaveTitle(/Evan Mavis/);

  await page.getByRole("button", { pressed: false }).first().click();
  const travel = page.getByRole("link", { name: "travel", exact: true });
  await expect(travel).toBeVisible();

  await travel.click();
  await expect(page).toHaveURL(/\/travel$/);
  await page.getByRole("link", { name: /back/i }).click();
  await expect(page).toHaveURL(/\/$/);
});
