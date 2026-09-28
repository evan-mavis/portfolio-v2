import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import PageLayout from "./PageLayout";

describe("PageLayout", () => {
  it("renders a back link to the home page", () => {
    render(<PageLayout>content</PageLayout>);
    expect(screen.getByRole("link", { name: /back/i })).toHaveAttribute(
      "href",
      "/",
    );
  });

  it("wraps a string title in a heading", () => {
    render(<PageLayout title="Travel">content</PageLayout>);
    expect(
      screen.getByRole("heading", { level: 1, name: "Travel" }),
    ).toBeInTheDocument();
  });

  it("renders a custom title node as-is and omits the default heading", () => {
    render(
      <PageLayout title={<p data-testid="custom">Food</p>}>content</PageLayout>,
    );
    expect(screen.getByTestId("custom")).toBeInTheDocument();
    expect(screen.queryByRole("heading")).not.toBeInTheDocument();
  });
});
