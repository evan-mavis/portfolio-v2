import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import FoodGallery from "./FoodGallery";

vi.mock("@vercel/analytics", () => ({ track: vi.fn() }));

function renderGallery() {
  const { container } = render(<FoodGallery />);
  const images = Array.from(container.querySelectorAll("img"));
  return { container, images };
}

describe("FoodGallery", () => {
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
    const alt = target.alt;

    fireEvent.doubleClick(target);
    expect(target.className).toContain("w-[300px]");
    expect(target.getAttribute("sizes")).toBe("300px");
    expect(screen.getByText(alt)).toBeInTheDocument();

    fireEvent.doubleClick(target);
    expect(target.className).toContain("w-20");
    expect(target.getAttribute("sizes")).toBe("80px");
  });

  it("supports keyboard enlargement without requiring a double click", () => {
    renderGallery();
    const target = screen.getByRole("button", {
      name: "enlarge scallop - osaka, japan",
    });
    fireEvent.keyDown(target, { key: "Enter" });
    expect(target).toHaveAttribute("aria-pressed", "true");
    fireEvent.keyDown(target, { key: " " });
    expect(target).toHaveAttribute("aria-pressed", "false");
    fireEvent.keyDown(target, { key: "ArrowRight" });
    expect(target).toHaveAttribute("aria-pressed", "false");
  });

  it("enlarges only one photo at a time", () => {
    const { images } = renderGallery();
    fireEvent.doubleClick(images[0]);
    fireEvent.doubleClick(images[1]);
    expect(images[0]).toHaveAttribute("sizes", "80px");
    expect(images[1]).toHaveAttribute("sizes", "300px");
    expect(screen.queryByText(images[0].alt)).not.toBeInTheDocument();
    expect(screen.getByText(images[1].alt)).toBeInTheDocument();
  });
});
