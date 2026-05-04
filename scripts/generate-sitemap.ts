import { writeFileSync } from "node:fs";
import { join } from "node:path";

const URL = "https://homemadecarolina.com/";
const today = new Date().toISOString().slice(0, 10);

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${URL}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>1.0</priority>
  </url>
</urlset>
`;

writeFileSync(join(process.cwd(), "public", "sitemap.xml"), xml);
console.log("sitemap.xml written");
