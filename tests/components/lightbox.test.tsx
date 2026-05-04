import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { Lightbox } from "@/components/sections/lightbox";

const images = [
  { src: "/a.jpg", alt: "A", filename: "a.jpg", category: "apparel" },
  { src: "/b.jpg", alt: "B", filename: "b.jpg", category: "apparel" },
  { src: "/c.jpg", alt: "C", filename: "c.jpg", category: "apparel" },
];

describe("<Lightbox>", () => {
  it("renders nothing when index is null", () => {
    const { container } = render(<Lightbox images={images} index={null} onClose={() => {}} onIndex={() => {}} />);
    expect(container.firstChild).toBeNull();
  });

  it("renders the image at the given index when open", () => {
    render(<Lightbox images={images} index={1} onClose={() => {}} onIndex={() => {}} />);
    expect(screen.getByAltText("B")).toBeInTheDocument();
  });

  it("calls onClose when Escape is pressed", () => {
    const onClose = vi.fn();
    render(<Lightbox images={images} index={1} onClose={onClose} onIndex={() => {}} />);
    fireEvent.keyDown(window, { key: "Escape" });
    expect(onClose).toHaveBeenCalled();
  });

  it("advances index on ArrowRight and wraps", () => {
    const onIndex = vi.fn();
    render(<Lightbox images={images} index={2} onClose={() => {}} onIndex={onIndex} />);
    fireEvent.keyDown(window, { key: "ArrowRight" });
    expect(onIndex).toHaveBeenCalledWith(0);
  });

  it("retreats index on ArrowLeft and wraps", () => {
    const onIndex = vi.fn();
    render(<Lightbox images={images} index={0} onClose={() => {}} onIndex={onIndex} />);
    fireEvent.keyDown(window, { key: "ArrowLeft" });
    expect(onIndex).toHaveBeenCalledWith(2);
  });
});
