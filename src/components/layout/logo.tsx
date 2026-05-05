import { cn } from "@/lib/utils";
import { asset } from "@/lib/asset";

export function Logo({ className, height = 36 }: { className?: string; height?: number }) {
  return (
    <a
      href="#top"
      aria-label="Homemade Carolina home"
      className={cn("inline-flex items-center", className)}
    >
      <img src={asset("/logo.png")} alt="Homemade Carolina" height={height} style={{ height }} />
    </a>
  );
}
