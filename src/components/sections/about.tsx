import { Section } from "@/components/layout/section";
import { Container } from "@/components/layout/container";
import { Reveal } from "@/components/motion/reveal";
import { ABOUT } from "@/content/about";
import { asset } from "@/lib/asset";

export function About() {
  return (
    <Section id="about">
      <Container className="grid items-center gap-10 md:grid-cols-2">
        <Reveal>
          <img
            src={asset(ABOUT.portraitSrc)}
            alt="Portrait of Carina Wilson, founder of Homemade Carolina"
            className="ring-ink/10 aspect-[4/5] w-full max-w-md rounded-md object-cover shadow-lg ring-1"
          />
        </Reveal>
        <Reveal delay={0.1}>
          <p className="text-pink text-xs tracking-[0.18em] uppercase">About</p>
          <h2 className="font-display mt-3 text-4xl md:text-5xl">{ABOUT.heading}</h2>
          <p className="text-muted mt-6 max-w-prose text-lg">{ABOUT.body}</p>
        </Reveal>
      </Container>
    </Section>
  );
}
