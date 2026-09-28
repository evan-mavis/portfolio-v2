import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import AvatarBadge from "./AvatarBadge";

const AVATAR_LABEL = "evan mavis avatar, opens full photo";

function renderBadge() {
  return render(<AvatarBadge />);
}

function getTrigger() {
  return screen.getByRole("button", { name: AVATAR_LABEL });
}

describe("AvatarBadge", () => {
  it("renders a focusable element with button semantics and an accessible label", () => {
    renderBadge();
    const trigger = getTrigger();
    expect(trigger).toHaveAttribute("tabindex", "0");
  });

  it("shows the new photo on the front face and the mandalorian on the back face", () => {
    renderBadge();
    const srcs = screen
      .getAllByRole("presentation")
      .map((image) => image.getAttribute("src"));
    expect(srcs).toContain("/avatar-new.webp");
    expect(srcs).toContain("/avatar-mandalorian.webp");
    expect(srcs).not.toContain("/avatar.jpeg");
  });

  it("uses the flip container classes for the css 3d flip on hover and focus", () => {
    renderBadge();
    const trigger = getTrigger();
    expect(trigger.className).toContain("avatar-flip");
    const inner = trigger.firstElementChild;
    expect(inner).not.toBeNull();
    expect(inner!.className).toContain("avatar-flip-inner");
    const faces = inner!.querySelectorAll(".avatar-flip-face");
    expect(faces).toHaveLength(2);
    expect(faces[1].className).toContain("avatar-flip-back");
  });

  it("opens the modal showing the new photo when clicked", () => {
    renderBadge();
    fireEvent.click(getTrigger());
    const modalImage = screen.getByRole("img", { name: "evan mavis" });
    expect(modalImage.getAttribute("src")).toBe("/avatar-new.webp");
  });

  it("opens the modal with the keyboard and closes it on backdrop click", () => {
    const { container } = renderBadge();
    const trigger = getTrigger();

    fireEvent.keyDown(trigger, { key: "Enter" });
    expect(screen.getByRole("img", { name: "evan mavis" })).toBeInTheDocument();

    const backdrop = container.querySelector(".backdrop-blur-md");
    expect(backdrop).not.toBeNull();
    fireEvent.click(backdrop!);
    expect(screen.queryByRole("img", { name: "evan mavis" })).toBeNull();

    fireEvent.keyDown(trigger, { key: " " });
    expect(screen.getByRole("img", { name: "evan mavis" })).toBeInTheDocument();
  });
});
