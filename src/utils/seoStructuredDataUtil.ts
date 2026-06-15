import {
  CONTACT_ADDRESS,
  CONTACT_EMAIL,
  CONTACT_PHONE,
  PERSON_KNOWS_ABOUT,
  PORTRAIT_IMAGE_URL,
  SITE_ALTERNATE_NAMES,
  SITE_DESCRIPTION,
  SITE_NAME,
  SITE_TITLE,
  SITE_URL,
  SOCIAL_PROFILES,
} from '../constants/seoConstants';
import { portfolioProjects } from '../data/projectsData';

/**
 * Builds JSON-LD structured data for search engines and social crawlers.
 *
 * @returns Serialized JSON-LD graph for Person, WebSite, ProfilePage, and projects
 */
export function buildStructuredDataJson(): string {
  const sameAs = Object.values(SOCIAL_PROFILES);

  const liveProjects = portfolioProjects.filter((project) => project.liveUrl !== '#');

  const graph = [
    {
      '@type': 'WebSite',
      '@id': `${SITE_URL}/#website`,
      name: SITE_NAME,
      alternateName: [...SITE_ALTERNATE_NAMES],
      url: SITE_URL,
      description: SITE_DESCRIPTION,
      inLanguage: 'en-PH',
      publisher: { '@id': `${SITE_URL}/#person` },
    },
    {
      '@type': 'ProfilePage',
      '@id': `${SITE_URL}/#profile`,
      url: SITE_URL,
      name: SITE_TITLE,
      description: SITE_DESCRIPTION,
      inLanguage: 'en-PH',
      isPartOf: { '@id': `${SITE_URL}/#website` },
      mainEntity: { '@id': `${SITE_URL}/#person` },
      about: { '@id': `${SITE_URL}/#person` },
      primaryImageOfPage: {
        '@type': 'ImageObject',
        url: PORTRAIT_IMAGE_URL,
        caption: `${SITE_NAME} — Web Developer`,
      },
    },
    {
      '@type': 'Person',
      '@id': `${SITE_URL}/#person`,
      name: SITE_NAME,
      url: SITE_URL,
      image: PORTRAIT_IMAGE_URL,
      jobTitle: 'Web Developer & Data Analyst',
      description: SITE_DESCRIPTION,
      email: `mailto:${CONTACT_EMAIL}`,
      telephone: CONTACT_PHONE,
      address: {
        '@type': 'PostalAddress',
        streetAddress: CONTACT_ADDRESS.streetAddress,
        addressLocality: CONTACT_ADDRESS.addressLocality,
        addressRegion: CONTACT_ADDRESS.addressRegion,
        postalCode: CONTACT_ADDRESS.postalCode,
        addressCountry: CONTACT_ADDRESS.addressCountry,
      },
      sameAs,
      knowsAbout: [...PERSON_KNOWS_ABOUT],
    },
    {
      '@type': 'ItemList',
      '@id': `${SITE_URL}/#projects`,
      name: 'Portfolio Projects',
      description: 'Selected web development projects by Lloyd Draizen Martirez',
      itemListElement: liveProjects.map((project, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        item: {
          '@type': 'CreativeWork',
          name: project.title,
          description: project.description,
          url: project.liveUrl,
          keywords: project.technologies.join(', '),
          author: { '@id': `${SITE_URL}/#person` },
        },
      })),
    },
  ];

  return JSON.stringify({
    '@context': 'https://schema.org',
    '@graph': graph,
  });
}
