import { describe, it, expect, vi, beforeEach } from "vitest";
import { scrollToAnchor } from "@/lib/scroll";

describe("scrollToAnchor", () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <header style="height: 64px"></header>
      <section id="services" style="margin-top: 1000px"></section>
    `;
    window.scrollTo = vi.fn();
    Object.defineProperty(document.querySelector("header")!, "offsetHeight", {
      configurable: true,
      value: 64,
    });
    Object.defineProperty(document.getElementById("services")!, "getBoundingClientRect", {
      configurable: true,
      value: () => ({ top: 1000, left: 0, right: 0, bottom: 0, width: 0, height: 0, x: 0, y: 0, toJSON: () => ({}) }),
    });
    Object.defineProperty(window, "scrollY", { configurable: true, value: 0 });
  });

  it("scrolls to the element offset by the header height", () => {
    scrollToAnchor("services");
    expect(window.scrollTo).toHaveBeenCalledWith({ top: 936, behavior: "smooth" });
  });

  it("respects prefers-reduced-motion by jumping instantly", () => {
    window.matchMedia = vi.fn().mockImplementation((q: string) => ({
      matches: q === "(prefers-reduced-motion: reduce)",
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    }));
    scrollToAnchor("services");
    expect(window.scrollTo).toHaveBeenCalledWith({ top: 936, behavior: "auto" });
  });

  it("is a no-op when target element is not found", () => {
    scrollToAnchor("does-not-exist");
    expect(window.scrollTo).not.toHaveBeenCalled();
  });
});
