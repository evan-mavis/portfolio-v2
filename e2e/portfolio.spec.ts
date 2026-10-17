import { expect, test } from "@playwright/test";

test("health endpoint reports ok", async ({ request }) => {
  const response = await request.get("/api/health");
  expect(response.ok()).toBe(true);
  expect(await response.json()).toMatchObject({ status: "ok" });
  expect(response.headers()["x-request-id"]).toBeTruthy();
});

test("uses neutral paper and moss in light mode, black and moss in dark mode", async ({
  page,
}) => {
  await page.emulateMedia({ colorScheme: "light" });
  await page.goto("/");
  const toggle = page.getByRole("button", { name: "toggle theme" });
  await expect(toggle).toBeEnabled();
  await expect(page.locator("body")).toHaveCSS(
    "background-color",
    "rgb(250, 244, 229)",
  );
  await expect(page.locator("body")).toHaveCSS("color", "rgb(42, 44, 44)");
  await expect(page.locator("body")).toHaveCSS("font-family", /Jersey 10/);
  await page.getByRole("button", { name: "expand all folders" }).click();
  const link = page.getByRole("link", { name: "travel", exact: true });
  await expect(link).toHaveCSS("color", "rgb(79, 98, 62)");
  await toggle.click();
  await expect(page.locator("body")).toHaveCSS(
    "background-color",
    "rgb(0, 0, 0)",
  );
  await expect(link).toHaveCSS("color", "rgb(154, 170, 133)");
  await toggle.click();
  await expect(page.locator("body")).toHaveCSS(
    "background-color",
    "rgb(250, 244, 229)",
  );
});

test("keeps the avatar static and opens its photo with the keyboard", async ({
  page,
}) => {
  await page.goto("/");
  const avatar = page.getByRole("button", {
    name: "evan mavis avatar, opens full photo",
  });
  await avatar.hover();
  await expect(avatar).toHaveCSS("transform", "none");
  await expect(avatar.locator("img")).toHaveCount(1);
  await expect(avatar.locator("img")).toHaveAttribute(
    "src",
    "/avatar-new.webp",
  );
  await avatar.focus();
  await page.keyboard.press("Enter");
  const dialog = page.getByRole("dialog", { name: "full photo of evan mavis" });
  await expect(dialog).toBeVisible();
  await expect(page.getByRole("img", { name: "evan mavis" })).toHaveAttribute(
    "src",
    "/avatar-new.webp",
  );
  await page.keyboard.press("Escape");
  await expect(dialog).not.toBeVisible();
  await expect(avatar).toBeFocused();
  await page.keyboard.press("Space");
  await expect(dialog).toBeVisible();
  await page.getByRole("button", { name: "close full photo" }).click();
  await expect(dialog).not.toBeVisible();
  await expect(
    page.getByRole("button", { name: "evan mavis/", exact: true }),
  ).toHaveAttribute("aria-expanded", "true");
});

test("respects reduced motion for toggle animations", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  await expect(
    page.getByRole("button", { name: "toggle theme" }),
  ).toBeEnabled();
  for (const icon of await page
    .locator(".toggle-icon[data-active=true]")
    .all()) {
    await expect(icon).toHaveCSS("animation-name", "none");
    await expect(icon).toHaveCSS("transition-duration", "0s");
  }
});

test("preserves folder state through reloads and gallery round trips", async ({
  page,
}) => {
  await page.goto("/");
  await page.getByRole("button", { name: "career/", exact: true }).click();
  await page
    .getByRole("button", { name: "interesting stuff/", exact: true })
    .click();
  const career = page.getByRole("button", { name: "career/", exact: true });
  await page.reload();
  await expect(career).toHaveAttribute("aria-expanded", "true");
  await page.getByRole("link", { name: "travel", exact: true }).click();
  await expect(page).toHaveURL(/\/travel$/);
  await page.getByRole("link", { name: "back", exact: true }).click();
  await expect(career).toHaveAttribute("aria-expanded", "true");
  await page
    .getByRole("link", { name: "food trip to southeast asia + japan" })
    .click();
  await expect(page).toHaveURL(/\/food$/);
  await page.getByRole("link", { name: "back", exact: true }).click();
  await expect(career).toHaveAttribute("aria-expanded", "true");
  await expect(
    page.getByRole("button", { name: "tech i use/", exact: true }),
  ).toHaveAttribute("aria-expanded", "false");
});

test("shows the requested tooling order with a bundled Devin icon", async ({
  page,
}) => {
  await page.goto("/");
  await page.getByRole("button", { name: "expand all folders" }).click();
  const tooling = page.getByRole("button", { name: "tooling/", exact: true });
  const contents = page.locator(
    `[id="${await tooling.getAttribute("aria-controls")}"]`,
  );
  await expect(contents.locator("button, a")).toHaveText([
    "codex",
    "factory",
    "cursor",
    "github",
    "my agentic workflow skills",
    "devin",
  ]);
  await expect(
    contents
      .getByRole("button", { name: "devin", exact: true })
      .locator("svg path"),
  ).toHaveCount(3);
});

test("serves the helmet favicon and Apple touch icon", async ({
  page,
  request,
}) => {
  await page.goto("/");
  for (const [path, contentType] of [
    ["/favicon.ico", /image\/(x-icon|vnd.microsoft.icon)/],
    ["/icon.png", /image\/png/],
    ["/apple-icon.png", /image\/png/],
  ] as const) {
    const response = await request.get(path);
    expect(response.ok()).toBe(true);
    expect(response.headers()["content-type"]).toMatch(contentType);
    expect((await response.body()).length).toBeGreaterThan(100);
  }
  await expect(page.locator('link[rel="icon"][href^="/icon.png"]')).toHaveCount(
    1,
  );
  await expect(page.locator('link[rel="apple-touch-icon"]')).toHaveCount(1);
});

test("enlarges food photos by double click and keyboard", async ({ page }) => {
  await page.goto("/food");
  const photo = page.getByRole("button", {
    name: "enlarge scallop - osaka, japan",
  });
  await photo.dblclick();
  await expect(photo).toHaveAttribute("aria-pressed", "true");
  await expect(
    page.getByText("scallop - osaka, japan", { exact: true }),
  ).toBeVisible();
  await photo.focus();
  await page.keyboard.press("Enter");
  await expect(photo).toHaveAttribute("aria-pressed", "false");
  await page.keyboard.press("Space");
  await expect(photo).toHaveAttribute("aria-pressed", "true");
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
});
