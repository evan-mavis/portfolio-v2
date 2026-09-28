import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import AvatarModal from "./AvatarModal";

describe("AvatarModal", () => {
  it("renders nothing while closed", () => {
    const { container } = render(
      <AvatarModal isOpen={false} onClose={() => {}} avatarSrc="/a.jpeg" />,
    );
    expect(container).toBeEmptyDOMElement();
  });

  it("displays the given avatar image when open", () => {
    render(
      <AvatarModal isOpen onClose={() => {}} avatarSrc="/avatar-new.webp" />,
    );
    const image = screen.getByRole("img", { name: "evan mavis" });
    expect(image.getAttribute("src")).toBe("/avatar-new.webp");
  });

  it("closes when the backdrop is clicked", () => {
    const onClose = vi.fn();
    const { container } = render(
      <AvatarModal isOpen onClose={onClose} avatarSrc="/a.jpeg" />,
    );
    const backdrop = container.querySelector(".backdrop-blur-md");
    expect(backdrop).not.toBeNull();
    fireEvent.click(backdrop!);
    expect(onClose).toHaveBeenCalledOnce();
  });
});
