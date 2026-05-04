import { Section } from "@/components/layout/section";
import { Container } from "@/components/layout/container";
import { Reveal } from "@/components/motion/reveal";
import { SERVICES } from "@/content/services";
import { ServiceCard } from "./service-card";

export function Services() {
  return (
    <Section id="services" className="bg-paper-2/40">
      <Container>
        <Reveal>
          <p className="text-pink text-xs tracking-[0.18em] uppercase">What I make</p>
          <h2 className="font-display mt-3 text-4xl md:text-5xl">Services</h2>
          <p className="text-muted mt-3 max-w-xl">
            Tell me what you need — apparel, drinkware, signage, or a one-off — I'll match it to the
            right tools.
          </p>
        </Reveal>
        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((s, i) => (
            <Reveal key={s.slug} delay={i * 0.1}>
              <ServiceCard service={s} index={i} />
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}
