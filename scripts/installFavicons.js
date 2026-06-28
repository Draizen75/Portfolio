import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import sharp from 'sharp';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const publicDir = path.join(__dirname, '../public');

const sourcePath = 'C:/Users/draiz/.gemini/antigravity-ide/brain/0079e1cd-b103-42d3-aa31-1130fab2a523/favicon_d_logo_mark_1782613223062.png';

const sizes = [
  { name: 'favicon-32x32.png', size: 32 },
  { name: 'favicon-192x192.png', size: 192 },
  { name: 'apple-touch-icon.png', size: 180 },
];

async function run() {
  if (!fs.existsSync(sourcePath)) {
    console.error('❌ Source image not found at:', sourcePath);
    process.exit(1);
  }

  console.log('⚙️ Loading source image metadata...');
  const image = sharp(sourcePath);
  const metadata = await image.metadata();
  const width = metadata.width || 512;
  const height = metadata.height || 512;
  const channels = metadata.channels || 3;

  console.log('⚙️ Fetching raw pixel buffer...');
  const raw = await image.raw().toBuffer();

  // Sample background color inside the rounded box (e.g. at 15% from top-left)
  const sampleX = Math.round(width * 0.15);
  const sampleY = Math.round(height * 0.15);
  const sampleIndex = (sampleY * width + sampleX) * channels;
  const bgR = raw[sampleIndex];
  const bgG = raw[sampleIndex + 1];
  const bgB = raw[sampleIndex + 2];
  console.log(`Dark background color sampled at (${sampleX}, ${sampleY}): RGB(${bgR}, ${bgG}, ${bgB})`);

  // Create an RGBA buffer for the keyed image
  const rgbaBuffer = Buffer.alloc(width * height * 4);
  
  // Define color distance thresholds for soft chroma keying
  const lowTol = 40;  // Under this distance, pixel is fully transparent
  const highTol = 80; // Over this distance, pixel is fully opaque

  for (let i = 0; i < width * height; i++) {
    const srcIndex = i * channels;
    const destIndex = i * 4;

    const r = raw[srcIndex];
    const g = raw[srcIndex + 1];
    const b = raw[srcIndex + 2];

    // Distance to the dark slate background
    const distDark = Math.abs(r - bgR) + Math.abs(g - bgG) + Math.abs(b - bgB);
    // Distance to white (outer corners)
    const distWhite = Math.abs(r - 255) + Math.abs(g - 255) + Math.abs(b - 255);

    rgbaBuffer[destIndex] = r;
    rgbaBuffer[destIndex + 1] = g;
    rgbaBuffer[destIndex + 2] = b;

    if (distDark < lowTol || distWhite < 30) {
      rgbaBuffer[destIndex + 3] = 0; // Fully transparent
    } else if (distDark < highTol) {
      // Soft transition for anti-aliasing edges
      const alpha = Math.round(((distDark - lowTol) / (highTol - lowTol)) * 255);
      rgbaBuffer[destIndex + 3] = alpha;
    } else {
      rgbaBuffer[destIndex + 3] = 255; // Fully opaque
    }
  }

  const transparentLogoBuffer = await sharp(rgbaBuffer, {
    raw: { width, height, channels: 4 }
  })
  .png()
  .toBuffer();

  console.log('🔄 Saving transparent logo mark to public/images/logo_mark.png...');
  const imagesDir = path.join(publicDir, 'images');
  if (!fs.existsSync(imagesDir)) {
    fs.mkdirSync(imagesDir, { recursive: true });
  }
  fs.writeFileSync(path.join(imagesDir, 'logo_mark.png'), transparentLogoBuffer);
  console.log('✅ Transparent logo mark saved.');

  // ⚙️ Scan the RGBA buffer to find the exact bounding box of the glowing D logo (pixels with alpha > 50 and high color saturation to exclude gray borders)
  let minX = width;
  let maxX = 0;
  let minY = height;
  let maxY = 0;
  let foundLogo = false;

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const idx = (y * width + x) * 4;
      const r = rgbaBuffer[idx];
      const g = rgbaBuffer[idx + 1];
      const b = rgbaBuffer[idx + 2];
      const alpha = rgbaBuffer[idx + 3];

      // The glowing logo is highly colorful (blue/cyan/purple), while the background, white corners, and gray border transitions are desaturated.
      const isColorful = (Math.max(r, g, b) - Math.min(r, g, b)) > 30;

      if (alpha > 50 && isColorful) {
        foundLogo = true;
        if (x < minX) minX = x;
        if (x > maxX) maxX = x;
        if (y < minY) minY = y;
        if (y > maxY) maxY = y;
      }
    }
  }

  // Fallback if no pixels match (should not happen)
  if (!foundLogo) {
    minX = Math.round(width * 0.25);
    maxX = Math.round(width * 0.75);
    minY = Math.round(height * 0.25);
    maxY = Math.round(height * 0.75);
  }

  const cropWidth = maxX - minX + 1;
  const cropHeight = maxY - minY + 1;
  console.log(`⚙️ Bounding box detected (colorful logo only): X: ${minX}-${maxX}, Y: ${minY}-${maxY} (${cropWidth}x${cropHeight})`);

  console.log('⚙️ Cropping empty margins around the logo...');
  const trimmedLogoBuffer = await sharp(rgbaBuffer, {
    raw: { width, height, channels: 4 }
  })
  .extract({ left: minX, top: minY, width: cropWidth, height: cropHeight })
  .png()
  .toBuffer();

  console.log('⚙️ Generating PNG favicons with optimal 8% padding...');
  const paddingPercent = 0.08; // 8% padding on all sides

  for (const { name, size } of sizes) {
    const innerSize = Math.round(size * (1 - paddingPercent * 2));
    const pad = Math.round(size * paddingPercent);

    await sharp(trimmedLogoBuffer)
      .resize(innerSize, innerSize, {
        fit: 'contain',
        background: { r: 0, g: 0, b: 0, alpha: 0 }
      })
      .extend({
        top: pad,
        bottom: size - innerSize - pad,
        left: pad,
        right: size - innerSize - pad,
        background: { r: 0, g: 0, b: 0, alpha: 0 }
      })
      .png()
      .toFile(path.join(publicDir, name));
    console.log(`✅ Generated ${name} (${size}x${size})`);
  }

  console.log('⚙️ Generating public/favicon.svg with embedded transparent logo...');
  // Resize to 512x512 with 8% padding for the SVG icon
  const svgSize = 512;
  const svgInnerSize = Math.round(svgSize * (1 - paddingPercent * 2));
  const svgPad = Math.round(svgSize * paddingPercent);
  const svgPngBuffer = await sharp(trimmedLogoBuffer)
    .resize(svgInnerSize, svgInnerSize, {
      fit: 'contain',
      background: { r: 0, g: 0, b: 0, alpha: 0 }
    })
    .extend({
      top: svgPad,
      bottom: svgSize - svgInnerSize - svgPad,
      left: svgPad,
      right: svgSize - svgInnerSize - svgPad,
      background: { r: 0, g: 0, b: 0, alpha: 0 }
    })
    .png()
    .toBuffer();

  const base64Logo = svgPngBuffer.toString('base64');
  const svgContent = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
  <image href="data:image/png;base64,${base64Logo}" x="0" y="0" height="512" width="512"/>
</svg>\n`;
  
  fs.writeFileSync(path.join(publicDir, 'favicon.svg'), svgContent);
  console.log('✅ Generated favicon.svg');

  console.log('🎉 Favicons successfully generated!');
}

run().catch((err) => {
  console.error('❌ Favicon installation failed:', err.message);
  process.exit(1);
});
