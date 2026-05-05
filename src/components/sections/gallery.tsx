import { useMemo, useState } from "react";
import { Section } from "@/components/layout/section";
import { Container } from "@/components/layout/container";
import { Reveal } from "@/components/motion/reveal";
import { GALLERY } from "@/data/gallery.generated";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { GalleryTile } from "./gallery-tile";
import { Lightbox } from "./lightbox";

const CHIPS = [
  { value: "all", label: "All" },
  { value: "apparel", label: "Apparel" },
  { value: "drinkware", label: "Drinkware" },
  { value: "signs", label: "Signs" },
  { value: "gifts", label: "Gifts" },
];

export function Gallery() {
  const [filter, setFilter] = useState<string>("all");
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const flat = useMemo(() => {
    return GALLERY.flatMap((g) => g.images.map((img) => ({ ...img, category: g.category }))).filter(
      (img) => filter === "all" || img.category === filter,
    );
  }, [filter]);

  return (
    <Section id="gallery">
      <Container>
        <Reveal>
          <p className="text-pink text-xs tracking-[0.18em] uppercase">Recent work</p>
          <h2 className="font-display mt-3 text-4xl md:text-5xl">Gallery</h2>
        </Reveal>

        <ToggleGroup
          value={[filter]}
          onValueChange={(v: string[]) => { if (v.length > 0) setFilter(v[v.length - 1]); }}
          className="mt-8 flex flex-wrap gap-2"
          aria-label="Gallery filter"
        >
          {CHIPS.map((c) => (
            <ToggleGroupItem
              key={c.value}
              value={c.value}
              className="border-rule hover:bg-pink-soft aria-pressed:!bg-pink aria-pressed:!text-paper aria-pressed:!border-pink rounded-full border px-4 py-2 text-sm transition-colors"
            >
              {c.label}
            </ToggleGroupItem>
          ))}
        </ToggleGroup>

        <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
          {flat.map((img, i) => (
            <GalleryTile
              key={img.src}
              image={img}
              category={img.category}
              onOpen={() => setOpenIndex(i)}
            />
          ))}
        </div>
      </Container>

      <Lightbox
        images={flat}
        index={openIndex}
        onClose={() => setOpenIndex(null)}
        onIndex={(i) => setOpenIndex(i)}
      />
    </Section>
  );
}
