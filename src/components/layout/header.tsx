import { useEffect, useState } from "react";
import { Phone } from "lucide-react";
import { Logo } from "./logo";
import { MobileNav } from "./mobile-nav";
import { ScrollProgressBar } from "@/components/motion/scroll-progress-bar";
import { scrollToAnchor } from "@/lib/scroll";
import { CONTACT } from "@/content/contact";
import { cn } from "@/lib/utils";

const LINKS = [
  { id: "services", label: "Services" },
  { id: "gallery", label: "Gallery" },
  { id: "about", label: "About" },
  { id: "contact", label: "Contact" },
];

export function Header() {
  const [shrunk, setShrunk] = useState(false);
  useEffect(() => {
    const onScroll = () => setShrunk(window.scrollY > 80);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "border-muted-soft/40 bg-paper/85 sticky top-0 z-40 border-b backdrop-blur",
        "transition-[padding] duration-200",
        shrunk ? "py-3" : "py-6",
      )}
    >
      <ScrollProgressBar />
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 sm:px-8">
        <Logo height={shrunk ? 28 : 36} />

        <nav aria-label="Primary" className="hidden md:flex md:items-center md:gap-8">
          {LINKS.map((l) => (
            <button
              key={l.id}
              type="button"
              onClick={() => scrollToAnchor(l.id)}
              className="hover:text-pink focus-visible:outline focus-visible:outline-2 focus-visible:outline-pink focus-visible:outline-offset-2 rounded-sm text-sm tracking-wide uppercase"
            >
              {l.label}
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={`tel:${CONTACT.phoneE164}`}
            className="hover:text-pink focus-visible:outline focus-visible:outline-2 focus-visible:outline-pink focus-visible:outline-offset-2 rounded-sm hidden items-center gap-2 text-sm md:inline-flex"
          >
            <Phone className="size-4" />
            {CONTACT.phoneDisplay}
          </a>
          <MobileNav />
        </div>
      </div>
    </header>
  );
}
