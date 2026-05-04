export type BusinessInfo = {
  name: string;
  url: string;
  phone: string;
  email: string;
  city: string;
  region: string;
  country: string;
  description: string;
  priceRange: string;
  socials: { instagram?: string; facebook?: string };
};

export type LocalBusinessJsonLd = {
  "@context": "https://schema.org";
  "@type": "LocalBusiness";
  name: string;
  url: string;
  telephone: string;
  email: string;
  description: string;
  priceRange: string;
  address: {
    "@type": "PostalAddress";
    addressLocality: string;
    addressRegion: string;
    addressCountry: string;
  };
  areaServed: string[];
  sameAs?: string[];
};

export function localBusinessJsonLd(info: BusinessInfo): LocalBusinessJsonLd {
  const sameAs = [info.socials.instagram, info.socials.facebook].filter(
    (v): v is string => Boolean(v),
  );
  const json: LocalBusinessJsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: info.name,
    url: info.url,
    telephone: info.phone,
    email: info.email,
    description: info.description,
    priceRange: info.priceRange,
    address: {
      "@type": "PostalAddress",
      addressLocality: info.city,
      addressRegion: info.region,
      addressCountry: info.country,
    },
    areaServed: [info.city, `${info.city}, ${info.region}`, "United States"],
  };
  if (sameAs.length > 0) json.sameAs = sameAs;
  return json;
}
