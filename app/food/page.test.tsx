import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import FoodPage from "./page";

vi.mock("@vercel/analytics", () => ({ track: vi.fn() }));

function renderGallery() {
  const { container } = render(<FoodPage />);
  const images = Array.from(container.querySelectorAll("img"));
  return { container, images };
}

describe("food page", () => {
  it("renders all 62 gallery images", () => {
    const { images } = renderGallery();
    expect(images).toHaveLength(62);
  });

  it("gives every image a sizes attribute", () => {
    const { images } = renderGallery();
    for (const image of images) {
      expect(image.getAttribute("sizes")).toBeTruthy();
    }
  });

  it("prioritizes only the first (s tier) row", () => {
    const { images } = renderGallery();
    const [sTier, rest] = [images.slice(0, 11), images.slice(11)];
    // priority images load eagerly: next/image omits loading="lazy"
    for (const image of sTier) {
      expect(image.getAttribute("loading")).toBeNull();
    }
    for (const image of rest) {
      expect(image.getAttribute("loading")).toBe("lazy");
    }
  });

  it("enlarges an image on double click and collapses it again", () => {
    const { images } = renderGallery();
    const target = images[0];
    const alt = target.getAttribute("alt")!;

    fireEvent.doubleClick(target);
    expect(target.className).toContain("w-[300px]");
    expect(target.getAttribute("sizes")).toBe("300px");
    expect(screen.getByText(alt)).toBeInTheDocument();

    fireEvent.doubleClick(target);
    expect(target.className).toContain("w-20");
    expect(target.getAttribute("sizes")).toBe("80px");
  });
});
