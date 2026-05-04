import type { GalleryImage } from "../../../scripts/generate-gallery-manifest";

type Props = { image: GalleryImage; category: string; onOpen: () => void };

export function GalleryTile({ image, category, onOpen }: Props) {
  return (
    <button
      type="button"
      onClick={onOpen}
      className="group bg-muted-soft/40 focus-visible:outline-pink relative block overflow-hidden rounded-md focus-visible:outline focus-visible:outline-2"
    >
      <img
        src={image.src}
        alt={image.alt}
        loading="lazy"
        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
      />
      <span aria-hidden className="bg-pink text-paper pointer-events-none absolute top-2 right-2 rounded-full px-2 py-1 text-xs opacity-0 transition-opacity duration-200 group-hover:opacity-100">
        {category}
      </span>
    </button>
  );
}
