import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import AvatarModal from "./AvatarModal";

describe("AvatarModal", () => {
  it("shows the given avatar in a named modal dialog", () => {
    render(<AvatarModal onClose={() => {}} avatarSrc="/avatar-new.webp" />);
    expect(
      screen.getByRole("dialog", { name: "full photo of evan mavis" }),
    ).toHaveAttribute("open");
    expect(screen.getByRole("img", { name: "evan mavis" })).toHaveAttribute(
      "src",
      "/avatar-new.webp",
    );
  });

  it("closes when the backdrop is clicked", () => {
    const onClose = vi.fn();
    render(<AvatarModal onClose={onClose} avatarSrc="/avatar-new.webp" />);
    fireEvent.click(screen.getByRole("dialog"));
    expect(onClose).toHaveBeenCalledOnce();
  });
});
