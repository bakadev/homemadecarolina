import { motion } from "framer-motion";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { useReveal } from "@/hooks/use-reveal";
import { revealVariants } from "@/lib/motion";
import { type ReactNode } from "react";

export function Reveal({ children, delay = 0 }: { children: ReactNode; delay?: number }) {
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
    >
      {children}
    </motion.div>
  );
}
