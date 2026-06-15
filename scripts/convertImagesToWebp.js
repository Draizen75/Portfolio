/**
 * Converts PNG/JPEG project screenshots to WebP when source is newer or WebP is missing.
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import sharp from 'sharp';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const imagesDir = path.join(__dirname, '../public/images');
const sourceExtensions = new Set(['.png', '.jpg', '.jpeg']);

/**
 * Recursively collects raster image files under the images directory.
 *
 * @param dir - Directory to scan
 * @returns Absolute paths of convertible images
 */
function collectSourceImages(dir) {
  if (!fs.existsSync(dir)) {
    return [];
  }

  const files = [];

  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      files.push(...collectSourceImages(fullPath));
      continue;
    }

    if (sourceExtensions.has(path.extname(entry.name).toLowerCase())) {
      // OG image is generated programmatically — do not treat as a conversion source
      if (entry.name === 'og-image.png') {
        continue;
      }
      files.push(fullPath);
    }
  }

  return files;
}

/**
 * Converts a single image to WebP when needed.
 *
 * @param sourcePath - Path to the source raster image
 * @returns true when a new WebP file was written
 */
async function convertImage(sourcePath) {
  const webpPath = sourcePath.replace(/\.(png|jpe?g)$/i, '.webp');

  if (fs.existsSync(webpPath)) {
    const sourceTime = fs.statSync(sourcePath).mtimeMs;
    const webpTime = fs.statSync(webpPath).mtimeMs;
    if (webpTime >= sourceTime) {
      return false;
    }
  }

  await sharp(sourcePath)
    .webp({ quality: 82, effort: 4 })
    .toFile(webpPath);

  return true;
}

/**
 * Converts all project screenshots to WebP format.
 */
async function convertImagesToWebp() {
  const sources = collectSourceImages(imagesDir);

  if (sources.length === 0) {
    console.log('ℹ️  No PNG/JPEG images found to convert.');
    return;
  }

  let converted = 0;

  for (const sourcePath of sources) {
    const didConvert = await convertImage(sourcePath);
    if (didConvert) {
      converted += 1;
      console.log(`✅ Converted ${path.relative(imagesDir, sourcePath)} → WebP`);
    }
  }

  console.log(`✅ WebP conversion complete (${converted} updated, ${sources.length} checked)`);
}

convertImagesToWebp().catch((error) => {
  console.error('❌ WebP conversion failed:', error.message);
  process.exit(1);
});
