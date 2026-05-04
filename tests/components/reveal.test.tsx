import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { Reveal } from "@/components/motion/reveal";

describe("<Reveal>", () => {
  it("renders its children", () => {
    render(<Reveal>hello</Reveal>);
    expect(screen.getByText("hello")).toBeInTheDocument();
  });

  it("uses opacity-only variants when reduced-motion is on", () => {
    window.matchMedia = vi.fn().mockReturnValue({
      matches: true,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    });
    render(<Reveal>hello</Reveal>);
    const el = screen.getByText("hello").parentElement!;
    expect(el.style.transform ?? "").not.toContain("translate");
  });
});
