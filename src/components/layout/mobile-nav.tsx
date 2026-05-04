import { useState } from "react";
import { Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { scrollToAnchor } from "@/lib/scroll";

const LINKS = [
  { id: "services", label: "Services" },
  { id: "gallery", label: "Gallery" },
  { id: "about", label: "About" },
  { id: "contact", label: "Contact" },
];

export function MobileNav() {
  const [open, setOpen] = useState(false);
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" aria-label="Open menu" className="md:hidden">
          <Menu className="size-6" />
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-72">
        <nav aria-label="Mobile" className="mt-12 flex flex-col gap-4">
          {LINKS.map((l) => (
            <button
              key={l.id}
              type="button"
              onClick={() => {
                setOpen(false);
                setTimeout(() => scrollToAnchor(l.id), 50);
              }}
              className="font-display text-left text-2xl"
            >
              {l.label}
            </button>
          ))}
        </nav>
      </SheetContent>
    </Sheet>
  );
}
