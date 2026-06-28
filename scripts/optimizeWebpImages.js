/**
 * Recursively resizes and optimizes WebP screenshots in public/images.
 * Limits max width to 1000px and compresses to quality: 75.
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import sharp from 'sharp';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const imagesDir = path.join(__dirname, '../public/images');

const MAX_WIDTH = 1000;
const WEBP_QUALITY = 75;

/**
 * Recursively collects WebP images under the images directory.
 *
 * @param dir - Directory to scan
 * @returns Absolute paths of WebP images
 */
function collectWebpImages(dir) {
  if (!fs.existsSync(dir)) {
    return [];
  }

  const files = [];

  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      files.push(...collectWebpImages(fullPath));
      continue;
    }

    if (path.extname(entry.name).toLowerCase() === '.webp') {
      // Skip og-image.webp as it's generated programmatically
      if (entry.name === 'og-image.webp') {
        continue;
      }
      files.push(fullPath);
    }
  }

  return files;
}

/**
 * Optimizes a single WebP image.
 *
 * @param imagePath - Path to the WebP image
 */
async function optimizeImage(imagePath) {
  const stats = fs.statSync(imagePath);
  const originalSize = stats.size;

  try {
    const buffer = fs.readFileSync(imagePath);
    const image = sharp(buffer);
    const metadata = await image.metadata();

    let pipeline = sharp(buffer);
    let resized = false;

    // Only resize if the image is wider than MAX_WIDTH
    if (metadata.width && metadata.width > MAX_WIDTH) {
      pipeline = pipeline.resize({ width: MAX_WIDTH });
      resized = true;
    }

    // Re-compress to target quality in memory
    const outputBuffer = await pipeline
      .webp({ quality: WEBP_QUALITY, effort: 4 })
      .toBuffer();

    const newSize = outputBuffer.length;

    // Only overwrite if the new file is smaller or resized
    if (newSize < originalSize || resized) {
      fs.writeFileSync(imagePath, outputBuffer);
      const savings = originalSize - newSize;
      const pct = ((savings / originalSize) * 100).toFixed(1);
      const relativePath = path.relative(imagesDir, imagePath);
      console.log(`⚡ Optimized ${relativePath}: ${formatBytes(originalSize)} → ${formatBytes(newSize)} (-${pct}%) ${resized ? '[Resized]' : ''}`);
      return { originalSize, newSize, optimized: true };
    } else {
      return { originalSize, newSize: originalSize, optimized: false };
    }
  } catch (err) {
    console.error(`❌ Failed to optimize ${path.relative(imagesDir, imagePath)}:`, err.message);
    return { originalSize, newSize: originalSize, optimized: false };
  }
}

function formatBytes(bytes) {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

async function run() {
  console.log('🔍 Scanning WebP images for optimization...');
  const images = collectWebpImages(imagesDir);

  if (images.length === 0) {
    console.log('ℹ️ No WebP images found.');
    return;
  }

  console.log(`⚙️ Found ${images.length} WebP images. Optimizing...`);
  
  let totalOriginal = 0;
  let totalNew = 0;
  let optimizedCount = 0;

  for (const imagePath of images) {
    const result = await optimizeImage(imagePath);
    totalOriginal += result.originalSize;
    totalNew += result.newSize;
    if (result.optimized) {
      optimizedCount++;
    }
  }

  const totalSavings = totalOriginal - totalNew;
  const totalPct = ((totalSavings / totalOriginal) * 100).toFixed(1);

  console.log('\n=========================================');
  console.log(`📊 Optimization Complete:`);
  console.log(`✨ Images optimized: ${optimizedCount} / ${images.length}`);
  console.log(`💾 Total size: ${formatBytes(totalOriginal)} → ${formatBytes(totalNew)}`);
  console.log(`🎁 Savings: ${formatBytes(totalSavings)} (-${totalPct}%)`);
  console.log('=========================================');
}

run().catch((error) => {
  console.error('❌ Script execution failed:', error.message);
  process.exit(1);
});
