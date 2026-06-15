/**
 * Generates SEO assets: sitemap.xml.
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const publicDir = path.join(__dirname, '../public');

const SITE_URL = 'https://draizenmartirez.vercel.app';

/**
 * Writes sitemap.xml with the current last-modified date.
 */
function generateSitemap() {
  const today = new Date().toISOString().split('T')[0];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${SITE_URL}/</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
</urlset>
`;

  fs.writeFileSync(path.join(publicDir, 'sitemap.xml'), sitemap, 'utf8');
}

/**
 * Entry point for SEO file generation.
 */
function generateSeoFiles() {
  generateSitemap();
  console.log('✅ Generated SEO files (sitemap.xml)');
}

generateSeoFiles();
