import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { vi } from "vitest";
import { Gallery } from "@/components/sections/gallery";

vi.mock("@/data/gallery.generated", () => ({
  GALLERY: [
    { category: "apparel", images: [{ src: "/x/a1.jpg", alt: "shirt", filename: "a1.jpg" }] },
    { category: "drinkware", images: [{ src: "/x/d1.jpg", alt: "tumbler", filename: "d1.jpg" }] },
  ],
}));

describe("<Gallery>", () => {
  it("shows all images when 'All' filter is active", () => {
    render(<Gallery />);
    expect(screen.getByAltText("shirt")).toBeInTheDocument();
    expect(screen.getByAltText("tumbler")).toBeInTheDocument();
  });

  it("filters to a single category when chip clicked", async () => {
    render(<Gallery />);
    await userEvent.click(screen.getByRole("button", { name: /apparel/i }));
    expect(screen.getByAltText("shirt")).toBeInTheDocument();
    expect(screen.queryByAltText("tumbler")).not.toBeInTheDocument();
  });
});
