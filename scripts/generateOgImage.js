/**
 * Generates a branded Open Graph image (1200×630) matching the portfolio design.
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import sharp from 'sharp';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const publicDir = path.join(__dirname, '../public');
const imagesDir = path.join(publicDir, 'images');

const OG_WIDTH = 1200;
const OG_HEIGHT = 630;
const OG_PNG = path.join(imagesDir, 'og-image.png');
const OG_WEBP = path.join(imagesDir, 'og-image.webp');
const PORTRAIT_PNG = path.join(imagesDir, 'portrait.png');
const PORTRAIT_WEBP = path.join(imagesDir, 'portrait.webp');

const PORTRAIT_WIDTH = 300;
const PORTRAIT_HEIGHT = 400;
const PORTRAIT_RADIUS = 36;

/**
 * Resolves the portrait source file, preferring PNG for quality.
 *
 * @returns Absolute path to an existing portrait asset
 */
function resolvePortraitPath() {
  if (fs.existsSync(PORTRAIT_PNG)) {
    return PORTRAIT_PNG;
  }

  if (fs.existsSync(PORTRAIT_WEBP)) {
    return PORTRAIT_WEBP;
  }

  throw new Error('Portrait image not found at public/images/portrait.png');
}

/**
 * Builds the SVG background and typography layer for the OG image.
 *
 * @returns SVG markup string
 */
function buildOgSvg() {
  const gridLines = [];

  for (let x = 0; x <= OG_WIDTH; x += 48) {
    gridLines.push(
      `<line x1="${x}" y1="0" x2="${x}" y2="${OG_HEIGHT}" stroke="rgba(148,163,184,0.08)" stroke-width="1"/>`
    );
  }

  for (let y = 0; y <= OG_HEIGHT; y += 48) {
    gridLines.push(
      `<line x1="0" y1="${y}" x2="${OG_WIDTH}" y2="${y}" stroke="rgba(148,163,184,0.08)" stroke-width="1"/>`
    );
  }

  return `<svg width="${OG_WIDTH}" height="${OG_HEIGHT}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#0a0a0f"/>
      <stop offset="100%" stop-color="#0f172a"/>
    </linearGradient>
    <radialGradient id="glowBlue" cx="20%" cy="15%" r="55%">
      <stop offset="0%" stop-color="#2563eb" stop-opacity="0.28"/>
      <stop offset="100%" stop-color="#2563eb" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="glowIndigo" cx="85%" cy="90%" r="50%">
      <stop offset="0%" stop-color="#4f46e5" stop-opacity="0.22"/>
      <stop offset="100%" stop-color="#4f46e5" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="accent" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#2563eb"/>
      <stop offset="100%" stop-color="#4f46e5"/>
    </linearGradient>
  </defs>

  <rect width="${OG_WIDTH}" height="${OG_HEIGHT}" fill="url(#bg)"/>
  <rect width="${OG_WIDTH}" height="${OG_HEIGHT}" fill="url(#glowBlue)"/>
  <rect width="${OG_WIDTH}" height="${OG_HEIGHT}" fill="url(#glowIndigo)"/>
  ${gridLines.join('\n  ')}

  <!-- Brand mark -->
  <text x="88" y="92" fill="#f8fafc" font-family="Georgia, 'Times New Roman', serif" font-size="34" font-weight="500">Draizen</text>
  <rect x="88" y="108" width="72" height="3" rx="1.5" fill="url(#accent)" opacity="0.9"/>

  <!-- Headline -->
  <text x="88" y="210" fill="#f8fafc" font-family="Georgia, 'Times New Roman', serif" font-size="58" font-weight="500">Lloyd Draizen</text>
  <text x="88" y="272" fill="#f8fafc" font-family="Georgia, 'Times New Roman', serif" font-size="58" font-weight="500">Martirez</text>

  <!-- Role -->
  <text x="88" y="332" fill="#cbd5e1" font-family="system-ui, -apple-system, 'Segoe UI', sans-serif" font-size="28" font-weight="300">Web Developer</text>
  <text x="88" y="368" fill="#60a5fa" font-family="system-ui, -apple-system, 'Segoe UI', sans-serif" font-size="28" font-weight="500">&amp; Data Analyst</text>

  <!-- Tagline -->
  <text x="88" y="430" fill="#94a3b8" font-family="system-ui, -apple-system, 'Segoe UI', sans-serif" font-size="22" font-weight="400">Beautiful, functional, user-centric web experiences.</text>

  <!-- Tech pills -->
  <rect x="88" y="468" width="108" height="38" rx="19" fill="rgba(15,23,42,0.75)" stroke="rgba(59,130,246,0.35)" stroke-width="1"/>
  <text x="142" y="493" text-anchor="middle" fill="#e2e8f0" font-family="system-ui, sans-serif" font-size="15" font-weight="600">React</text>

  <rect x="206" y="468" width="118" height="38" rx="19" fill="rgba(15,23,42,0.75)" stroke="rgba(59,130,246,0.35)" stroke-width="1"/>
  <text x="265" y="493" text-anchor="middle" fill="#e2e8f0" font-family="system-ui, sans-serif" font-size="15" font-weight="600">Next.js</text>

  <rect x="334" y="468" width="148" height="38" rx="19" fill="rgba(15,23,42,0.75)" stroke="rgba(59,130,246,0.35)" stroke-width="1"/>
  <text x="408" y="493" text-anchor="middle" fill="#e2e8f0" font-family="system-ui, sans-serif" font-size="15" font-weight="600">TypeScript</text>

  <!-- Portrait frame glow (behind photo composite) -->
  <rect x="812" y="108" width="${PORTRAIT_WIDTH + 24}" height="${PORTRAIT_HEIGHT + 24}" rx="${PORTRAIT_RADIUS + 8}" fill="rgba(37,99,235,0.18)"/>
  <rect x="824" y="120" width="${PORTRAIT_WIDTH}" height="${PORTRAIT_HEIGHT}" rx="${PORTRAIT_RADIUS}" fill="none" stroke="rgba(148,163,184,0.35)" stroke-width="2"/>
</svg>`;
}

/**
 * Renders the portrait with rounded corners for compositing.
 *
 * @param portraitPath - Source portrait file path
 * @returns PNG buffer of the masked portrait
 */
async function buildRoundedPortrait(portraitPath) {
  const mask = Buffer.from(
    `<svg width="${PORTRAIT_WIDTH}" height="${PORTRAIT_HEIGHT}">
      <rect width="${PORTRAIT_WIDTH}" height="${PORTRAIT_HEIGHT}" rx="${PORTRAIT_RADIUS}" fill="white"/>
    </svg>`
  );

  return sharp(portraitPath)
    .resize(PORTRAIT_WIDTH, PORTRAIT_HEIGHT, { fit: 'cover', position: 'top' })
    .composite([{ input: mask, blend: 'dest-in' }])
    .png()
    .toBuffer();
}

/**
 * Generates og-image.png and og-image.webp assets.
 */
async function generateOgImage() {
  const portraitPath = resolvePortraitPath();
  const svgLayer = buildOgSvg();
  const baseImage = await sharp(Buffer.from(svgLayer)).png().toBuffer();
  const portraitImage = await buildRoundedPortrait(portraitPath);

  const composite = await sharp(baseImage)
    .composite([{ input: portraitImage, left: 824, top: 120 }])
    .png({ quality: 92 })
    .toBuffer();

  await sharp(composite).toFile(OG_PNG);
  await sharp(composite).webp({ quality: 88 }).toFile(OG_WEBP);

  console.log('✅ Generated og-image.png and og-image.webp');
}

generateOgImage().catch((error) => {
  console.error('❌ OG image generation failed:', error.message);
  process.exit(1);
});
