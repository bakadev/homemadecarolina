import { describe, it, expect } from "vitest";
import { EASING, DURATIONS, revealVariants } from "@/lib/motion";

describe("motion constants", () => {
  it("exposes the soft easing as a 4-tuple cubic-bezier", () => {
    expect(EASING.soft).toEqual([0.22, 1, 0.36, 1]);
  });

  it("exposes durations in seconds", () => {
    expect(DURATIONS.reveal).toBeCloseTo(0.6);
    expect(DURATIONS.hover).toBeCloseTo(0.2);
    expect(DURATIONS.ambient).toBeCloseTo(1.2);
  });

  it("revealVariants returns hidden + visible states", () => {
    const v = revealVariants();
    expect(v.hidden).toEqual({ opacity: 0, y: 24 });
    expect(v.visible).toEqual(expect.objectContaining({ opacity: 1, y: 0 }));
  });

  it("revealVariants respects reducedMotion=true (no y translate)", () => {
    const v = revealVariants({ reducedMotion: true });
    expect(v.hidden).toEqual({ opacity: 0 });
    expect(v.visible).toEqual(expect.objectContaining({ opacity: 1 }));
  });
});
