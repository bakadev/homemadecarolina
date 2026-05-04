// src/components/seo-jsonld.tsx
import { localBusinessJsonLd } from "@/lib/seo";
import { CONTACT } from "@/content/contact";

export function SeoJsonLd() {
  const json = localBusinessJsonLd({
    name: "Homemade Carolina",
    url: CONTACT.url,
    phone: CONTACT.phoneE164,
    email: CONTACT.email,
    city: CONTACT.city,
    region: CONTACT.region,
    country: CONTACT.country,
    description: CONTACT.description,
    priceRange: CONTACT.priceRange,
    socials: { instagram: CONTACT.instagram, facebook: CONTACT.facebook },
  });
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(json) }}
    />
  );
}
