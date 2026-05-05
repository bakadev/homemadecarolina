import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Phone } from "lucide-react";
import { Container } from "@/components/layout/container";
import { Reveal } from "@/components/motion/reveal";
import { HERO } from "@/content/hero";
import { CONTACT } from "@/content/contact";
import { scrollToAnchor } from "@/lib/scroll";
import { asset } from "@/lib/asset";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

const COLLAGE = [
  { src: asset("/gallery/apparel/pretty-woman-wearing-tshirt.jpg"), alt: "Custom apparel sample", rot: -3, top: 4, left: 6 },
  { src: asset("/gallery/drinkware/thermos.jpg"), alt: "Custom drinkware sample", rot: 4, top: 28, left: 50 },
  { src: asset("/gallery/signs/4719.jpg"), alt: "Custom sign sample", rot: -2, top: 60, left: 14 },
];

export function Hero() {
  const reduced = useReducedMotion();
  return (
    <section id="top" className="relative overflow-hidden pt-12 md:pt-20">
      <Container className="grid items-center gap-10 md:grid-cols-2 md:gap-16">
        <div>
          <Reveal>
            <p className="text-pink text-xs tracking-[0.18em] uppercase">{HERO.eyebrow}</p>
          </Reveal>
          <Reveal delay={0.08}>
            <h1 className="font-display mt-4 text-5xl leading-[1.05] md:text-7xl">
              {HERO.headline.lead}
              <br />
              {HERO.headline.lead2}{" "}
              <span className="relative inline-block">
                <span className="font-script text-pink">{HERO.headline.scriptWord}</span>
                <ScribbleUnderline animate={!reduced} />
              </span>
              {HERO.headline.trail}
            </h1>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="text-muted mt-6 max-w-prose text-lg">{HERO.subhead}</p>
          </Reveal>
          <Reveal delay={0.24}>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Button
                size="lg"
                onClick={() => scrollToAnchor("contact")}
                className="bg-pink text-paper hover:bg-pink/90 rounded-full"
              >
                {HERO.ctas.primary}
              </Button>
              <a
                href={`tel:${CONTACT.phoneE164}`}
                className="text-ink hover:text-pink focus-visible:outline focus-visible:outline-pink focus-visible:outline-offset-2 rounded-sm inline-flex items-center gap-2 text-sm"
              >
                <Phone className="size-4" />
                {HERO.ctas.secondaryLabel} {CONTACT.phoneDisplay}
              </a>
            </div>
          </Reveal>
        </div>

        <div className="relative h-[420px] md:h-[520px]" aria-hidden>
          {COLLAGE.map((p, i) => (
            <motion.img
              key={p.src}
              src={p.src}
              alt={p.alt}
              className="ring-ink/10 absolute h-44 w-44 rounded-md object-cover shadow-xl ring-1 md:h-60 md:w-60"
              style={{ top: `${p.top}%`, left: `${p.left}%`, rotate: `${p.rot}deg` }}
              animate={reduced ? undefined : { y: [0, i % 2 === 0 ? -4 : 4, 0] }}
              transition={
                reduced ? undefined : { duration: 8 + i * 2, repeat: Infinity, ease: "easeInOut" }
              }
            />
          ))}
        </div>
      </Container>
    </section>
  );
}

function ScribbleUnderline({ animate }: { animate: boolean }) {
  return (
    <svg
      className="text-pink absolute -bottom-2 left-0 h-3 w-full"
      viewBox="0 0 200 12"
      preserveAspectRatio="none"
    >
      <motion.path
        d="M2 8 Q 50 2 100 6 T 198 8"
        fill="none"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        initial={animate ? { pathLength: 0 } : { pathLength: 1 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.7, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
      />
    </svg>
  );
}
