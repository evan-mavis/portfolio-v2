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
    render(<AvatarModal isOpen onClose={onClose} avatarSrc="/a.jpeg" />);
    const backdrop = document.querySelector(".backdrop-blur-md");
    expect(backdrop).not.toBeNull();
    fireEvent.click(backdrop!);
    expect(onClose).toHaveBeenCalledOnce();
  });

  it("does not pass the close click to the tree behind the modal", () => {
    const parentClick = vi.fn();
    render(
      <div onClick={parentClick}>
        <AvatarModal isOpen onClose={() => {}} avatarSrc="/a.jpeg" />
      </div>,
    );
    fireEvent.click(document.querySelector(".backdrop-blur-md")!);
    expect(parentClick).not.toHaveBeenCalled();
  });
});
