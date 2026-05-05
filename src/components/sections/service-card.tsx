import { Card, CardContent } from "@/components/ui/card";
import { type ServiceCategory } from "@/content/services";
import { GALLERY } from "@/data/gallery.generated";

export function ServiceCard({ service }: { service: ServiceCategory }) {
  const previews = GALLERY.find((g) => g.category === service.slug)?.images.slice(0, 3) ?? [];
  return (
    <Card
      className="group border-muted-soft/60 relative overflow-hidden transition-transform duration-200 hover:-translate-y-1"
    >
      <CardContent className={`p-6 ${service.slug === "commissions" && "max-w-1/2"}`}>
        <div className="mb-5 grid grid-cols-3 gap-2">
          {previews.length > 0
            ? previews.map((img) => (
                <img
                  key={img.src}
                  src={img.src}
                  alt={img.alt}
                  className="aspect-square rounded-md object-cover w-24 h-24"
                />
              ))
            : Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="bg-muted-soft/60 aspect-square rounded-md w-24 h-24" aria-hidden />
              ))}
        </div>
        <h3 className="font-display text-2xl">{service.title}</h3>
        <p className="text-muted mt-2 text-sm">{service.blurb}</p>
        <ul
          className="text-muted mt-4 flex flex-wrap gap-2 overflow-hidden text-xs transition-all duration-200"
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
