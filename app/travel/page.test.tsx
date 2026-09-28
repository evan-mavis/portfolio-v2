import { render } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { track } from "@vercel/analytics";
import TravelPage from "./page";

vi.mock("@vercel/analytics", () => ({ track: vi.fn() }));

function renderGallery() {
  const { container } = render(<TravelPage />);
  const images = Array.from(container.querySelectorAll("figure img"));
  return { container, images };
}

describe("travel page", () => {
  it("renders all 31 gallery images", () => {
    const { images } = renderGallery();
    expect(images).toHaveLength(31);
  });

  it("gives every image a sizes attribute and reserved width/height", () => {
    const { images } = renderGallery();
    for (const image of images) {
      expect(image.getAttribute("sizes")).toBeTruthy();
      expect(Number(image.getAttribute("width"))).toBeGreaterThan(0);
      expect(Number(image.getAttribute("height"))).toBeGreaterThan(0);
    }
  });

  it("prioritizes only the first two images", () => {
    const { images } = renderGallery();
    expect(images[0].getAttribute("loading")).toBeNull();
    expect(images[1].getAttribute("loading")).toBeNull();
    for (const image of images.slice(2)) {
      expect(image.getAttribute("loading")).toBe("lazy");
    }
  });

  it("uses CSS responsive alignment classes instead of runtime layout switching", () => {
    const { container } = renderGallery();
    const items = Array.from(container.querySelectorAll("figure")).map(
      (figure) => figure.parentElement!,
    );
    expect(items[0].className).toContain("items-center");
    expect(items[0].className).not.toContain("md:items-");
    expect(items[1].className).toContain("md:items-end");
    expect(items[3].className).toContain("md:items-start");
  });

  it("tracks a page view on mount", () => {
    renderGallery();
    expect(track).toHaveBeenCalledWith("travel_page_view");
  });
});
