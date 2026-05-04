import { describe, it, expect } from "vitest";
import { localBusinessJsonLd, type BusinessInfo } from "@/lib/seo";

const info: BusinessInfo = {
  name: "Homemade Carolina",
  url: "https://homemadecarolina.com",
  phone: "+17044882918",
  email: "carina@homemadecarolina.com",
  city: "Belmont",
  region: "NC",
  country: "US",
  socials: {
    instagram: "https://instagram.com/homemadecarolina",
    facebook: "https://facebook.com/homemadecarolina",
  },
  description: "Small-batch custom apparel, drinkware, signs, and gifts.",
  priceRange: "$$",
};

describe("localBusinessJsonLd", () => {
  it("produces a valid LocalBusiness schema object", () => {
    const json = localBusinessJsonLd(info);
    expect(json["@context"]).toBe("https://schema.org");
    expect(json["@type"]).toBe("LocalBusiness");
    expect(json.name).toBe("Homemade Carolina");
    expect(json.telephone).toBe("+17044882918");
    expect(json.email).toBe("carina@homemadecarolina.com");
    expect(json.address.addressLocality).toBe("Belmont");
    expect(json.address.addressRegion).toBe("NC");
    expect(json.sameAs).toEqual([
      "https://instagram.com/homemadecarolina",
      "https://facebook.com/homemadecarolina",
    ]);
    expect(json.areaServed).toContain("Belmont");
  });

  it("omits sameAs when no socials provided", () => {
    const json = localBusinessJsonLd({ ...info, socials: {} });
    expect(json.sameAs).toBeUndefined();
  });

  it("renders to a valid JSON string for embedding", () => {
    const str = JSON.stringify(localBusinessJsonLd(info));
    expect(() => JSON.parse(str)).not.toThrow();
  });
});
