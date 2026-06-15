/**
 * Central SEO configuration for meta tags, Open Graph, and structured data.
 */

export const SITE_URL = 'https://draizenmartirez.vercel.app';

export const SITE_NAME = 'Lloyd Draizen Martirez';

export const SITE_ALTERNATE_NAMES = ['Draizen', 'Draizen Portfolio'] as const;

export const SITE_TITLE = 'Lloyd Draizen Martirez | Web Developer & Data Analyst';

export const SITE_DESCRIPTION =
  'Portfolio of Lloyd Draizen Martirez, a Web Developer and Data Analyst from the Philippines specializing in React, Next.js, Node.js, TypeScript, and modern web applications.';

export const SITE_KEYWORDS = [
  'Lloyd Draizen Martirez',
  'Draizen',
  'Web Developer',
  'Data Analyst',
  'Software Engineer',
  'React Developer',
  'Next.js',
  'Node.js',
  'TypeScript',
  'Portfolio',
  'Philippines',
  'Camarines Sur',
] as const;

export const SITE_LOCALE = 'en_PH';

export const SITE_LANGUAGE = 'en';

export const OG_IMAGE_PATH = '/images/og-image.png';

export const OG_IMAGE_URL = `${SITE_URL}${OG_IMAGE_PATH}`;

export const PORTRAIT_IMAGE_URL = `${SITE_URL}/images/portrait.webp`;

export const SOCIAL_PROFILES = {
  github: 'https://github.com/Draizen75',
  linkedin: 'https://www.linkedin.com/in/lloydmartirez/',
  facebook: 'https://www.facebook.com/lloyddraizen.martirez/',
} as const;

export const CONTACT_EMAIL = 'draizenllaban@gmail.com';

export const CONTACT_PHONE = '+639923630328';

export const CONTACT_ADDRESS = {
  streetAddress: 'San Miguel',
  addressLocality: 'Bato',
  addressRegion: 'Camarines Sur',
  postalCode: '4435',
  addressCountry: 'PH',
} as const;

export const PERSON_KNOWS_ABOUT = [
  'Web Development',
  'React',
  'Next.js',
  'Node.js',
  'TypeScript',
  'Data Analysis',
  'Software Engineering',
  'PostgreSQL',
  'Supabase',
] as const;
