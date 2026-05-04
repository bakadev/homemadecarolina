import { Phone, Mail, MapPin } from "lucide-react";
import { InstagramIcon, FacebookIcon } from "@/components/ui/brand-icons";
import { Section } from "@/components/layout/section";
import { Container } from "@/components/layout/container";
import { Reveal } from "@/components/motion/reveal";
import { CONTACT } from "@/content/contact";

export function Contact() {
  return (
    <Section id="contact" className="bg-ink text-paper">
      <Container className="text-center">
        <Reveal>
          <p className="text-pink text-xs tracking-[0.18em] uppercase">Let's make something</p>
          <h2 className="font-display mt-3 text-4xl md:text-6xl">Get in touch</h2>
          <p className="text-paper/80 mt-4">
            Pick up the phone, send a note, or slide into the DMs — whatever's easiest.
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          <ul className="mt-12 flex flex-col items-center gap-6 text-lg">
            <li>
              <a className="hover:text-pink focus-visible:outline focus-visible:outline-2 focus-visible:outline-pink focus-visible:outline-offset-2 rounded-sm inline-flex items-center gap-3" href={`tel:${CONTACT.phoneE164}`}>
                <Phone className="size-5" />
                {CONTACT.phoneDisplay}
              </a>
            </li>
            <li>
              <a className="hover:text-pink focus-visible:outline focus-visible:outline-2 focus-visible:outline-pink focus-visible:outline-offset-2 rounded-sm inline-flex items-center gap-3" href={`mailto:${CONTACT.email}`}>
                <Mail className="size-5" />
                {CONTACT.email}
              </a>
            </li>
            <li className="flex items-center gap-6">
              <a aria-label="Instagram" className="hover:text-pink focus-visible:outline focus-visible:outline-2 focus-visible:outline-pink focus-visible:outline-offset-2 rounded-sm inline-flex" href={CONTACT.instagram} target="_blank" rel="noreferrer">
                <InstagramIcon className="size-6" />
              </a>
              <a aria-label="Facebook" className="hover:text-pink focus-visible:outline focus-visible:outline-2 focus-visible:outline-pink focus-visible:outline-offset-2 rounded-sm inline-flex" href={CONTACT.facebook} target="_blank" rel="noreferrer">
                <FacebookIcon className="size-6" />
              </a>
            </li>
            <li className="text-paper/60 mt-4 inline-flex items-center gap-2 text-sm">
              <MapPin className="size-4" />
              {CONTACT.shippingNote}
            </li>
          </ul>
        </Reveal>
      </Container>
    </Section>
  );
}
