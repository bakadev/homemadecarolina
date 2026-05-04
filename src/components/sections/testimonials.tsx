import { Section } from "@/components/layout/section";
import { Container } from "@/components/layout/container";
import { Reveal } from "@/components/motion/reveal";
import { Card, CardContent } from "@/components/ui/card";
import { TESTIMONIALS } from "@/content/testimonials";

export function Testimonials() {
  return (
    <Section id="testimonials" className="bg-paper-2/40">
      <Container>
        <Reveal>
          <p className="text-pink text-xs tracking-[0.18em] uppercase">Kind words</p>
          <h2 className="font-display mt-3 text-4xl md:text-5xl">What clients say</h2>
        </Reveal>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {TESTIMONIALS.map((t, i) => (
            <Reveal key={i} delay={i * 0.1}>
              <Card className="border-muted-soft/60 h-full">
                <CardContent className="p-6">
                  <p className="font-display text-xl leading-snug">"{t.quote}"</p>
                  <p className="text-muted mt-4 text-sm">— {t.attribution}</p>
                </CardContent>
              </Card>
            </Reveal>
          ))}
        </div>
        <p className="text-muted mt-6 text-center text-xs italic">
          (Quotes above are placeholders — replace before launch.)
        </p>
      </Container>
    </Section>
  );
}
