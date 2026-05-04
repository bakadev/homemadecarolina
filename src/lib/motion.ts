import type { Variants } from "framer-motion";

export const EASING = { soft: [0.22, 1, 0.36, 1] as const };
export const DURATIONS = { reveal: 0.6, hover: 0.2, ambient: 1.2 } as const;

export function revealVariants(opts: { reducedMotion?: boolean } = {}): Variants {
  if (opts.reducedMotion) {
    return {
      hidden: { opacity: 0 },
      visible: { opacity: 1, transition: { duration: DURATIONS.reveal, ease: EASING.soft } },
    };
  }
  return {
    hidden: { opacity: 0, y: 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: DURATIONS.reveal, ease: EASING.soft },
    },
  };
}
