/**
 * Portfolio project definitions shared by UI and SEO structured data.
 */

export interface PortfolioProject {
  title: string;
  description: string;
  technologies: string[];
  liveUrl: string;
  githubUrl: string;
  imageFolder: string;
}

export const portfolioProjects: PortfolioProject[] = [
  {
    title: 'SYD Commerce',
    description: 'A modern e-commerce platform with a focus on user experience and performance.',
    technologies: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Node.js'],
    liveUrl: 'https://sydcommerce.com',
    githubUrl: '#',
    imageFolder: 'sydcommerce',
  },
  {
    title: 'SYD POS',
    description: 'A comprehensive Point of Sale system for managing sales, inventory, and transactions.',
    technologies: ['React', 'Next.js', 'TypeScript', 'Node.js', 'PostgreSQL'],
    liveUrl: 'https://sydpos.biz',
    githubUrl: '#',
    imageFolder: 'sydpos',
  },
  {
    title: 'Duola',
    description:
      'A multi-tenant birth support SaaS for doula agencies — automated prenatal-to-postpartum care journeys, white-label branding, secure messaging, birth plan PDFs, and HIPAA-ready tenant isolation.',
    technologies: ['Next.js', 'TypeScript', 'PostgreSQL', 'Supabase', 'Tailwind CSS'],
    liveUrl: 'https://www.birthflowapp.com/',
    githubUrl: '#',
    imageFolder: 'birthflow',
  },
  {
    title: 'QR Code Generator',
    description: 'A simple web app to convert URLs into QR codes instantly.',
    technologies: ['Python', 'Flask'],
    liveUrl: '#',
    githubUrl: '#',
    imageFolder: 'qr-generator',
  },
  {
    title: 'Movie Recommendation System',
    description: 'A personalized movie recommendation system using collaborative filtering.',
    technologies: ['Python', 'Flask', 'TMDB API'],
    liveUrl: '#',
    githubUrl: '#',
    imageFolder: 'Movie Recommendations System',
  },
];
