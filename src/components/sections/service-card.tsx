import { Card, CardContent } from "@/components/ui/card";
import { type ServiceCategory } from "@/content/services";
import { GALLERY } from "@/data/gallery.generated";

export function ServiceCard({ service, index }: { service: ServiceCategory; index: number }) {
  const previews = GALLERY.find((g) => g.category === service.slug)?.images.slice(0, 3) ?? [];
  const isWide = service.slug === "commissions";
  return (
    <Card
      className={`group border-muted-soft/60 relative overflow-hidden transition-transform duration-200 hover:-translate-y-1 ${
        isWide ? "md:col-span-2 lg:col-span-2" : ""
      } ${!isWide && index % 2 === 1 ? "md:translate-y-8" : "md:translate-y-0"}`}
    >
      <CardContent className="p-6">
        <div className="mb-5 grid grid-cols-3 gap-2">
          {previews.length > 0
            ? previews.map((img) => (
                <img
                  key={img.src}
                  src={img.src}
                  alt={img.alt}
                  className="aspect-square rounded-md object-cover"
                />
              ))
            : Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="bg-muted-soft/60 aspect-square rounded-md" aria-hidden />
              ))}
        </div>
        <h3 className="font-display text-2xl">{service.title}</h3>
        <p className="text-muted mt-2 text-sm">{service.blurb}</p>
        <ul
          className="text-muted mt-4 flex max-h-0 flex-wrap gap-2 overflow-hidden text-xs opacity-0 transition-all duration-200 group-hover:max-h-20 group-hover:opacity-100"
          aria-label={`Techniques used for ${service.title}`}
        >
          {service.badges.map((b) => (
            <li key={b} className="bg-muted-soft/70 rounded-full px-2 py-1">
              {b}
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
