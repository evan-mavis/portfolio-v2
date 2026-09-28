import { renderToString } from "react-dom/server";
import { beforeEach, describe, expect, it } from "vitest";
import Home from "./page";
import { ALL_FOLDER_VALUES } from "@/components/portfolio-tree-data";
import { TREE_STORAGE_KEY } from "@/lib/tree-state";

describe("home page server render", () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  it("renders the default expansion even when storage holds a different state", () => {
    window.localStorage.setItem(
      TREE_STORAGE_KEY,
      JSON.stringify({ expanded: ALL_FOLDER_VALUES, allExpanded: true }),
    );
    const html = renderToString(<Home />);
    // child of the default-expanded job-title folder
    expect(html).toContain("career/");
    // nested inside the collapsed-by-default career folder
    expect(html).not.toContain("airgoods");
    // nested inside collapsed-by-default tech folders
    expect(html).not.toContain("excalidraw");
  });
});
