import { useCallback, useEffect } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import type { GalleryImage } from "../../../scripts/generate-gallery-manifest";

type Img = GalleryImage & { category: string };
type Props = {
  images: Img[];
  index: number | null;
  onClose: () => void;
  onIndex: (i: number) => void;
};

export function Lightbox({ images, index, onClose, onIndex }: Props) {
  const open = index !== null;

  const advance = useCallback(
    (delta: 1 | -1) => {
      if (index === null || images.length === 0) return;
      const next = (index + delta + images.length) % images.length;
      onIndex(next);
    },
    [index, images.length, onIndex],
  );

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") advance(1);
      if (e.key === "ArrowLeft") advance(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, advance, onClose]);

  if (!open) return null;
  const image = images[index];

  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogContent className="bg-ink/95 text-paper max-w-5xl border-none p-0">
        <div className="relative">
          <img src={image.src} alt={image.alt} className="mx-auto max-h-[85vh] w-auto" />
          <button
            type="button"
            aria-label="Previous image"
            onClick={() => advance(-1)}
            className="bg-paper/10 hover:bg-pink focus-visible:outline focus-visible:outline-2 focus-visible:outline-pink focus-visible:outline-offset-2 absolute top-1/2 left-3 -translate-y-1/2 rounded-full p-2"
          >
            <ChevronLeft className="size-6" />
          </button>
          <button
            type="button"
            aria-label="Next image"
            onClick={() => advance(1)}
            className="bg-paper/10 hover:bg-pink focus-visible:outline focus-visible:outline-2 focus-visible:outline-pink focus-visible:outline-offset-2 absolute top-1/2 right-3 -translate-y-1/2 rounded-full p-2"
          >
            <ChevronRight className="size-6" />
          </button>
          <button
            type="button"
            aria-label="Close"
            onClick={onClose}
            className="bg-paper/10 hover:bg-pink focus-visible:outline focus-visible:outline-2 focus-visible:outline-pink focus-visible:outline-offset-2 absolute top-3 right-3 rounded-full p-2"
          >
            <X className="size-5" />
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
