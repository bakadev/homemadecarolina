/**
 * Resolve a public-asset path against Vite's BASE_URL.
 *
 * In dev or at a custom domain, BASE_URL is "/" — `/logo.png` stays `/logo.png`.
 * On GitHub Pages under a project URL like `bakadev.github.io/homemadecarolina`,
 * BASE_URL is "/homemadecarolina/" — `/logo.png` becomes `/homemadecarolina/logo.png`.
 *
 * Use for any runtime-rendered asset path (`<img src>`, `<link>`, etc.).
 * Vite already rewrites absolute paths in `index.html` and in static imports,
 * so you only need this for dynamic/runtime strings.
 */
export function asset(path: string): string {
  const base = import.meta.env.BASE_URL.replace(/\/$/, "");
  const p = path.startsWith("/") ? path : `/${path}`;
  return base + p;
}
