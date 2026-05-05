import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "node:path";

// On GitHub Pages project URLs (https://<user>.github.io/<repo>/) the site is
// served from a sub-path. Setting GITHUB_PAGES=true at build time switches the
// Vite base to the repo name so all absolute asset URLs resolve correctly.
// In dev and on a custom domain, base stays "/".
const base = process.env.GITHUB_PAGES === "true" ? "/homemadecarolina/" : "/";

export default defineConfig({
  base,
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: { "@": path.resolve(__dirname, "./src") },
  },
});
