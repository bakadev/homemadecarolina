import { type HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type Props = HTMLAttributes<HTMLElement> & { id: string };

export function Section({ id, className, children, ...rest }: Props) {
  return (
    <section id={id} className={cn("scroll-mt-24 py-20 md:py-28", className)} {...rest}>
      {children}
    </section>
  );
}
