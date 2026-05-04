export function scrollToAnchor(id: string): void {
  const target = document.getElementById(id);
  if (!target) return;
  const header = document.querySelector("header");
  const offset = header ? header.offsetHeight : 0;
  const top = target.getBoundingClientRect().top + window.scrollY - offset;
  const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
  window.scrollTo({ top, behavior: reduce ? "auto" : "smooth" });
}
