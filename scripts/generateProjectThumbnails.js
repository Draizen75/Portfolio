/**
 * Generates small WebP thumbnail variants for project cards.
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import sharp from 'sharp';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const imagesDir = path.join(__dirname, '../public/images');
const widths = [360, 520];
const thumbnailMarker = '-card-';

function isSourceImage(fileName) {
  const extension = path.extname(fileName).toLowerCase();

  return (
    extension === '.webp' &&
    !fileName.includes(thumbnailMarker) &&
    fileName !== 'og-image.webp' &&
    fileName !== 'logo_mark.webp' &&
    fileName !== 'portrait.webp'
  );
}

function pickCardSource(folderPath) {
  const files = fs
    .readdirSync(folderPath, { withFileTypes: true })
    .filter((entry) => entry.isFile() && isSourceImage(entry.name))
    .map((entry) => entry.name)
    .sort();

  return files[0] || null;
}

function shouldWrite(outputPath, buffer) {
  if (!fs.existsSync(outputPath)) {
    return true;
  }

  return !fs.readFileSync(outputPath).equals(buffer);
}

async function generateThumbnail(sourcePath, outputPath, width) {
  const outputBuffer = await sharp(sourcePath)
    .resize({ width, withoutEnlargement: true })
    .webp({ quality: 72, effort: 4 })
    .toBuffer();

  if (!shouldWrite(outputPath, outputBuffer)) {
    return false;
  }

  fs.writeFileSync(outputPath, outputBuffer);
  return true;
}

async function run() {
  if (!fs.existsSync(imagesDir)) {
    console.warn(`Images directory does not exist: ${imagesDir}`);
    return;
  }

  const folders = fs
    .readdirSync(imagesDir, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name)
    .sort();

  let generatedCount = 0;

  for (const folder of folders) {
    const folderPath = path.join(imagesDir, folder);
    const sourceFile = pickCardSource(folderPath);

    if (!sourceFile) {
      continue;
    }

    const sourcePath = path.join(folderPath, sourceFile);
    const parsedPath = path.parse(sourceFile);

    for (const width of widths) {
      const outputPath = path.join(folderPath, `${parsedPath.name}${thumbnailMarker}${width}.webp`);
      const didWrite = await generateThumbnail(sourcePath, outputPath, width);

      if (didWrite) {
        generatedCount++;
      }
    }
  }

  console.log(`Generated project thumbnails: ${generatedCount} updated`);
}

run().catch((error) => {
  console.error('Failed to generate project thumbnails:', error.message);
  process.exit(1);
});
