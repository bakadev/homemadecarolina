import { describe, it, expect, vi } from "vitest";
import { renderHook } from "@testing-library/react";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

function mockMatchMedia(matches: boolean) {
  window.matchMedia = vi.fn().mockImplementation((q: string) => ({
    matches: q === "(prefers-reduced-motion: reduce)" ? matches : false,
    media: q,
    onchange: null,
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    addListener: vi.fn(),
    removeListener: vi.fn(),
    dispatchEvent: vi.fn(),
  }));
}

describe("useReducedMotion", () => {
  it("returns true when the user prefers reduced motion", () => {
    mockMatchMedia(true);
    const { result } = renderHook(() => useReducedMotion());
    expect(result.current).toBe(true);
  });

  it("returns false when the user does not prefer reduced motion", () => {
    mockMatchMedia(false);
    const { result } = renderHook(() => useReducedMotion());
    expect(result.current).toBe(false);
  });
});
