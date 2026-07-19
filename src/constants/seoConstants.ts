/**
 * Central SEO configuration for meta tags, Open Graph, and structured data.
 */

export const SITE_URL = 'https://draizenmartirez.vercel.app';

export const SITE_NAME = 'Lloyd Draizen Martirez';

export const SITE_ALTERNATE_NAMES = ['Draizen', 'Draizen Portfolio'] as const;

export const SITE_TITLE = 'Lloyd Draizen Martirez | Full-Stack Web Developer';

export const SITE_DESCRIPTION =
  'Portfolio of Lloyd Draizen Martirez, a Full-Stack Web Developer from the Philippines building responsive business applications with React, Next.js, Angular, TypeScript, and modern web tools.';

export const SITE_KEYWORDS = [
  'Lloyd Draizen Martirez',
  'Draizen',
  'Full-Stack Web Developer',
  'Web Developer',
  'React Developer',
  'Angular Developer',
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

export const CONTACT_PHONE = '';

export const CONTACT_ADDRESS = {
  streetAddress: '',
  addressLocality: 'Bato',
  addressRegion: 'Camarines Sur',
  postalCode: '',
  addressCountry: 'PH',
} as const;

export const PERSON_KNOWS_ABOUT = [
  'Web Development',
  'React',
  'Next.js',
  'Node.js',
  'TypeScript',
  'Software Engineering',
  'PostgreSQL',
  'Supabase',
] as const;
