/**
 * Generates PNG favicon assets from public/favicon.svg for browsers and search engines.
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import sharp from 'sharp';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const publicDir = path.join(__dirname, '../public');
const svgPath = path.join(publicDir, 'favicon.svg');

const sizes = [
  { name: 'favicon-32x32.png', size: 32 },
  { name: 'favicon-192x192.png', size: 192 },
  { name: 'apple-touch-icon.png', size: 180 },
];

/**
 * Renders raster favicon files from the SVG source.
 */
async function generateFavicons() {
  if (!fs.existsSync(svgPath)) {
    throw new Error('Missing public/favicon.svg');
  }

  const svgBuffer = fs.readFileSync(svgPath);

  for (const { name, size } of sizes) {
    await sharp(svgBuffer)
      .resize(size, size)
      .png()
      .toFile(path.join(publicDir, name));
  }

  console.log(`✅ Generated ${sizes.length} favicon PNG files in public/`);
}

generateFavicons().catch((error) => {
  console.error(error);
  process.exit(1);
});
