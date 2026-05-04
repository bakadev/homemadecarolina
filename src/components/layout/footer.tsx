import { InstagramIcon, FacebookIcon } from "@/components/ui/brand-icons";
import { Container } from "./container";
import { Logo } from "./logo";
import { CONTACT } from "@/content/contact";
import { scrollToAnchor } from "@/lib/scroll";

const LINKS = [
  { id: "services", label: "Services" },
  { id: "gallery", label: "Gallery" },
  { id: "about", label: "About" },
  { id: "contact", label: "Contact" },
];

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-muted-soft/40 bg-paper border-t py-12">
      <Container className="flex flex-col items-start gap-8 md:flex-row md:items-center md:justify-between">
        <div>
          <Logo height={32} />
          <p className="text-muted mt-2 max-w-xs text-sm">
            Small-batch from Belmont, NC.
          </p>
        </div>

        <nav aria-label="Footer" className="flex flex-wrap gap-x-6 gap-y-2">
          {LINKS.map((l) => (
            <button
              key={l.id}
              type="button"
              onClick={() => scrollToAnchor(l.id)}
              className="hover:text-pink focus-visible:outline focus-visible:outline-2 focus-visible:outline-pink focus-visible:outline-offset-2 rounded-sm text-sm"
            >
              {l.label}
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <a aria-label="Instagram" href={CONTACT.instagram} target="_blank" rel="noreferrer" className="focus-visible:outline focus-visible:outline-2 focus-visible:outline-pink focus-visible:outline-offset-2 rounded-sm">
            <InstagramIcon className="hover:text-pink size-5" />
          </a>
          <a aria-label="Facebook" href={CONTACT.facebook} target="_blank" rel="noreferrer" className="focus-visible:outline focus-visible:outline-2 focus-visible:outline-pink focus-visible:outline-offset-2 rounded-sm">
            <FacebookIcon className="hover:text-pink size-5" />
          </a>
        </div>
      </Container>
      <Container className="text-muted mt-8 flex justify-between text-xs">
        <span>© {year} Homemade Carolina · Belmont, NC</span>
      </Container>
    </footer>
  );
}
