import { motion } from "framer-motion";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { useReveal } from "@/hooks/use-reveal";
import { revealVariants } from "@/lib/motion";
import { type ReactNode } from "react";

export function Reveal({ children, delay = 0, className }: { children: ReactNode; delay?: number; className?: string }) {
  const reduced = useReducedMotion();
  const { ref, shown } = useReveal<HTMLDivElement>();
  const variants = revealVariants({ reducedMotion: reduced });
  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={shown ? "visible" : "hidden"}
      transition={{ delay }}
      variants={variants}
      className={className}
    >
      {children}
    </motion.div>
  );
}
