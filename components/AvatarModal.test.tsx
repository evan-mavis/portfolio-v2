import { fireEvent, render } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import AvatarModal from "./AvatarModal";

describe("AvatarModal", () => {
  it("renders nothing while closed", () => {
    const { container } = render(
      <AvatarModal isOpen={false} onClose={() => {}} avatarSrc="/a.jpeg" />,
    );
    expect(container).toBeEmptyDOMElement();
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
