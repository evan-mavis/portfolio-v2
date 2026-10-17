import { fireEvent, render, screen } from "@testing-library/react";
import { useState } from "react";
import { describe, expect, it } from "vitest";
import { File, Folder, Tree } from "./FileTree";

function ExampleTree() {
  const [expandedItems, onExpandedChange] = useState<string[]>([]);
  return (
    <Tree expandedItems={expandedItems} onExpandedChange={onExpandedChange}>
      <Folder
        value="folder"
        element="folder/"
        accessory={<button type="button">accessory</button>}
      >
        <File value="note" isLink={false}>
          note
        </File>
        <File value="link" isLink>
          <a href="/travel">travel</a>
        </File>
      </Folder>
    </Tree>
  );
}

describe("FileTree", () => {
  it("expands and collapses folders through their accessible trigger", () => {
    render(<ExampleTree />);
    const trigger = screen.getByRole("button", { name: "folder/" });
    expect(trigger).toHaveAttribute("aria-expanded", "false");
    fireEvent.click(trigger);
    expect(trigger).toHaveAttribute("aria-expanded", "true");
    expect(screen.getByRole("button", { name: "note" })).toBeInTheDocument();
    fireEvent.click(trigger);
    expect(trigger).toHaveAttribute("aria-expanded", "false");
    expect(screen.queryByRole("button", { name: "note" })).toBeNull();
  });

  it("keeps accessories and links outside other buttons", () => {
    const { container } = render(<ExampleTree />);
    fireEvent.click(screen.getByRole("button", { name: "accessory" }));
    expect(screen.getByRole("button", { name: "folder/" })).toHaveAttribute(
      "aria-expanded",
      "false",
    );
    fireEvent.click(screen.getByRole("button", { name: "folder/" }));
    expect(
      screen.getByRole("link", { name: "travel" }).closest("button"),
    ).toBeNull();
    expect(container.querySelector("button button")).toBeNull();
  });

  it("selects a plain file without changing folder expansion", () => {
    render(<ExampleTree />);
    const folder = screen.getByRole("button", { name: "folder/" });
    fireEvent.click(folder);
    const file = screen.getByRole("button", { name: "note" });
    fireEvent.click(file);
    expect(file).toHaveClass("bg-muted");
    expect(folder).toHaveAttribute("aria-expanded", "true");
  });

  it("requires a tree context", () => {
    expect(() =>
      render(
        <File value="note" isLink={false}>
          note
        </File>,
      ),
    ).toThrow("Tree components must be used within a Tree");
  });
});
