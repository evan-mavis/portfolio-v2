import { expect, test } from "@playwright/test";

test("health endpoint reports ok", async ({ request }) => {
  const response = await request.get("/api/health");
  expect(response.ok()).toBe(true);
  expect(await response.json()).toMatchObject({ status: "ok" });
});

test("home page expands the tree and navigates to travel", async ({ page }) => {
  await page.goto("/");
  await expect(page).toHaveTitle(/evan mavis/);
  await expect(page.getByText("career/")).toBeVisible();
  await expect(page.getByText("tech i use/")).toBeVisible();
  await expect(page.getByText("interesting stuff/")).toBeVisible();
  await expect(page.getByText(/airgoods • software engineer/)).toHaveCount(0);

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
  const root = page.locator("button[aria-expanded]").first();
  const expanded = await root.getAttribute("aria-expanded");
  await page
    .getByRole("button", {
      name: "evan mavis avatar, opens full photo",
      exact: true,
    })
    .click();
  await expect(page.getByRole("img", { name: "evan mavis" })).toBeVisible();
  await page.locator(".backdrop-blur-md").click({ position: { x: 20, y: 20 } });
  await expect(page.getByRole("img", { name: "evan mavis" })).toHaveCount(0);
  await expect(root).toHaveAttribute("aria-expanded", expanded ?? "true");
});

test("opening the tree keeps its left edge still", async ({ page }) => {
  await page.goto("/");
  const root = page.locator("button[aria-expanded]").first();
  await root.click();
  const before = await root.boundingBox();
  await root.click();
  const after = await root.boundingBox();
  expect(before).not.toBeNull();
  expect(after).not.toBeNull();
  expect(Math.abs(after!.x - before!.x)).toBeLessThan(1);
});

test("reserves space for the vertical scrollbar", async ({ page }) => {
  await page.goto("/");
  expect(
    await page.evaluate(
      () => getComputedStyle(document.documentElement).scrollbarGutter,
    ),
  ).toBe("stable");
});

test("reload starts with the intro folders open", async ({ page }) => {
  await page.goto("/");
  await page.locator("button[aria-expanded]").first().click();
  await page.reload();
  await expect(page.getByText("career/")).toBeVisible();
  await expect(page.getByText("tech i use/")).toBeVisible();
});

test("the favicon uses the mandalorian avatar", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator('link[rel="icon"]')).toHaveAttribute(
    "href",
    "/avatar-mandalorian.webp",
  );
});
