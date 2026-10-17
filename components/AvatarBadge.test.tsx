import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import AvatarBadge from "./AvatarBadge";

const AVATAR_LABEL = "evan mavis avatar, opens full photo";

describe("AvatarBadge", () => {
  it("renders a native button with one static profile photo", () => {
    render(<AvatarBadge />);
    const trigger = screen.getByRole("button", { name: AVATAR_LABEL });
    expect(trigger.tagName).toBe("BUTTON");
    expect(trigger).toHaveAttribute("aria-haspopup", "dialog");
    const image = screen.getByRole("presentation");
    expect(image).toHaveAttribute("src", "/avatar-new.webp");
  });

  it("does not change the photo on hover or focus", () => {
    render(<AvatarBadge />);
    const trigger = screen.getByRole("button", { name: AVATAR_LABEL });
    fireEvent.mouseOver(trigger);
    fireEvent.focus(trigger);
    expect(screen.getAllByRole("presentation")).toHaveLength(1);
    expect(screen.getByRole("presentation")).toHaveAttribute(
      "src",
      "/avatar-new.webp",
    );
  });

  it("opens the full photo and closes it through the dialog", () => {
    render(<AvatarBadge />);
    fireEvent.click(screen.getByRole("button", { name: AVATAR_LABEL }));
    expect(screen.getByRole("dialog")).toBeInTheDocument();
    expect(screen.getByRole("img", { name: "evan mavis" })).toHaveAttribute(
      "src",
      "/avatar-new.webp",
    );
    fireEvent.click(screen.getByRole("button", { name: "close full photo" }));
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("closes when the browser cancels the dialog", () => {
    render(<AvatarBadge />);
    fireEvent.click(screen.getByRole("button", { name: AVATAR_LABEL }));
    fireEvent(screen.getByRole("dialog"), new Event("cancel"));
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });
});
