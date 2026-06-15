/**
 * Generates glowing SVG cover art for projects without screenshots.
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const imagesDir = path.join(__dirname, '../public/images');

const projectCovers = [
  {
    folder: 'qr-generator',
    fileName: 'qr-generator.svg',
    title: 'QR Code Generator',
    subtitle: 'FLASK WEB APP',
  },
  {
    folder: 'movie-recommendations-system',
    fileName: 'movie-recommendations-system.svg',
    title: 'Movie Recommendation System',
    subtitle: 'RECOMMENDATION ENGINE',
  },
];

/**
 * Builds a glowing project cover SVG matching the Duola placeholder style.
 *
 * @param title - Primary project title
 * @param subtitle - Secondary label under the title
 * @returns SVG markup string
 */
function buildProjectCoverSvg(title, subtitle) {
  const titleLines = splitTitleLines(title);
  const titleMarkup = titleLines
    .map((line, index) => {
      const y = titleLines.length === 1 ? 360 : 330 + index * 72;
      const fontSize = line.length > 18 ? 52 : line.length > 14 ? 60 : 72;
      return `<text x="600" y="${y}" text-anchor="middle" fill="#f8fafc" font-family="Georgia, serif" font-size="${fontSize}" font-weight="500">${escapeXml(line)}</text>`;
    })
    .join('\n  ');

  return `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="800" viewBox="0 0 1200 800" role="img" aria-label="${escapeXml(title)}">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#0f172a"/>
      <stop offset="45%" stop-color="#1e3a5f"/>
      <stop offset="100%" stop-color="#312e81"/>
    </linearGradient>
    <radialGradient id="glow" cx="30%" cy="25%" r="55%">
      <stop offset="0%" stop-color="#60a5fa" stop-opacity="0.35"/>
      <stop offset="100%" stop-color="#60a5fa" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <rect width="1200" height="800" fill="url(#bg)"/>
  <rect width="1200" height="800" fill="url(#glow)"/>
  ${titleMarkup}
  <text x="600" y="${titleLines.length === 1 ? 430 : 500}" text-anchor="middle" fill="#94a3b8" font-family="system-ui, sans-serif" font-size="28" letter-spacing="0.2em">${escapeXml(subtitle)}</text>
</svg>`;
}

/**
 * Splits long project titles across two lines for the cover art.
 *
 * @param title - Project title
 * @returns One or two display lines
 */
function splitTitleLines(title) {
  if (title.length <= 18) {
    return [title];
  }

  const words = title.split(' ');
  if (words.length < 2) {
    const midpoint = Math.ceil(title.length / 2);
    return [title.slice(0, midpoint), title.slice(midpoint)];
  }

  const firstLine = [];
  const secondLine = [];

  for (const word of words) {
    const target = firstLine.join(' ').length <= secondLine.join(' ').length ? firstLine : secondLine;
    target.push(word);
  }

  return [firstLine.join(' '), secondLine.join(' ')];
}

/**
 * Escapes text for safe inclusion in SVG markup.
 *
 * @param value - Raw text value
 * @returns XML-safe string
 */
function escapeXml(value) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

/**
 * Writes SVG cover files for projects that do not have screenshots yet.
 */
function generateProjectCovers() {
  let created = 0;

  for (const cover of projectCovers) {
    const folderPath = path.join(imagesDir, cover.folder);
    const filePath = path.join(folderPath, cover.fileName);

    if (!fs.existsSync(folderPath)) {
      fs.mkdirSync(folderPath, { recursive: true });
    }

    fs.writeFileSync(filePath, buildProjectCoverSvg(cover.title, cover.subtitle), 'utf8');
    created += 1;
  }

  console.log(`✅ Generated ${created} project cover SVG files`);
}

generateProjectCovers();
