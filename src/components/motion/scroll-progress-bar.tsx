import { useScrollProgress } from "@/hooks/use-scroll-progress";

export function ScrollProgressBar() {
  const p = useScrollProgress();
  return (
    <div aria-hidden className="bg-muted-soft/40 absolute top-0 left-0 h-[3px] w-full">
      <div
        className="bg-pink h-full transition-[width] duration-75 ease-linear"
        style={{ width: `${p * 100}%` }}
      />
    </div>
  );
}
