export type ServiceCategory = {
  slug: "apparel" | "drinkware" | "signs" | "gifts" | "commissions";
  title: string;
  blurb: string;
  badges: string[];
};

export const SERVICES: ServiceCategory[] = [
  {
    slug: "apparel",
    title: "Apparel & Accessories",
    blurb:
      "Full-color shirts, hoodies, tote bags, hats, and bandanas — vibrant on any fabric color, soft to the touch, built to last 50+ washes.",
    badges: ["DTF", "Cricut HTV", "Heat press"],
  },
  {
    slug: "drinkware",
    title: "Drinkware",
    blurb:
      "Tumblers, water bottles, wine glasses, and mugs with full-color wraps or permanent etched designs.",
    badges: ["UV (rotary)", "Laser", "Cricut vinyl"],
  },
  {
    slug: "signs",
    title: "Signs & Decor",
    blurb:
      "Wood signs, acrylic plaques, slate pieces, and event signage — engraved, printed, or both.",
    badges: ["Laser", "UV flatbed", "Cricut"],
  },
  {
    slug: "gifts",
    title: "Promo & Corporate Gifts",
    blurb:
      "Branded keychains, drinkware, leather goods, packaging, and matching apparel for events, launches, and gifting.",
    badges: ["UV", "Laser", "DTF", "Cricut"],
  },
  {
    slug: "commissions",
    title: "Personal Commissions",
    blurb:
      "Wedding decor, memorial pieces, custom gifts, and one-off ideas — bring me your concept and we'll make it.",
    badges: ["Custom"],
  },
];
