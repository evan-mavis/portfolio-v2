import { expect, test } from "@playwright/test";

test("health endpoint reports ok", async ({ request }) => {
  const response = await request.get("/api/health");
  expect(response.ok()).toBe(true);
  expect(await response.json()).toMatchObject({ status: "ok" });
});

test("home page expands the tree and navigates to travel", async ({ page }) => {
  await page.goto("/");
  await expect(page).toHaveTitle(/evan mavis/);

  await page.getByRole("button", { pressed: false }).first().click();
  const travel = page.getByRole("link", { name: "travel", exact: true });
  await expect(travel).toBeVisible();

  await travel.click();
  await expect(page).toHaveURL(/\/travel$/);
  await page.getByRole("link", { name: /back/i }).click();
  await expect(page).toHaveURL(/\/$/);
  await expect(travel).toBeVisible();
  const openFolders = page.locator(
    '[data-state="open"].relative.h-full.overflow-hidden.text-base',
  );
  await expect(openFolders.first()).not.toHaveClass(/animate-accordion-down/);
});

test("closing the avatar leaves the tree alone", async ({ page }) => {
  await page.goto("/");
  await page
    .getByRole("button", {
      name: "evan mavis avatar, opens full photo",
      exact: true,
    })
    .click();
  await expect(page.getByRole("img", { name: "evan mavis" })).toBeVisible();
  await page.locator(".backdrop-blur-md").click({ position: { x: 20, y: 20 } });
  await expect(page.getByRole("img", { name: "evan mavis" })).toHaveCount(0);
  expect(
    await page.evaluate(() => localStorage.getItem("portfolio-tree-state")),
  ).toBeNull();
});

test("the favicon uses the mandalorian avatar", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator('link[rel="icon"]')).toHaveAttribute(
    "href",
    "/avatar-mandalorian.webp",
  );
});
