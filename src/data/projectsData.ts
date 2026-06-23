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
    technologies: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Node.js', 'PostgreSQL', 'Prisma'],
    liveUrl: 'https://sydcommerce.com',
    githubUrl: '#',
    imageFolder: 'sydcommerce',
  },
  {
    title: 'SYD POS',
    description: 'A comprehensive Point of Sale system for managing sales, inventory, and transactions.',
    technologies: ['React', 'Next.js', 'TypeScript', 'Node.js', 'PostgreSQL', 'Tailwind CSS',],
    liveUrl: 'https://sydpos.biz',
    githubUrl: '#',
    imageFolder: 'sydpos',
  },
  {
    title: 'Duola',
    description:
      'A multi-tenant birth support SaaS for doula agencies — automated prenatal-to-postpartum care journeys, white-label branding, secure messaging, birth plan PDFs, and HIPAA-ready tenant isolation.',
    technologies: ['Next.js', 'TypeScript', 'PostgreSQL', 'Supabase', 'Tailwind CSS', 'Prisma', 'Stripe'],
    liveUrl: 'https://www.birthflowapp.com/',
    githubUrl: '#',
    imageFolder: 'birthflow',
  },
  {
    title: 'QR Code Generator',
    description: 'A simple web app to convert URLs into QR codes instantly.',
    technologies: ['Python', 'Flask', 'HTML/CSS', 'JavaScript', 'PyQRCode', 'Pillow', 'Jinja2'],
    liveUrl: '#',
    githubUrl: '#',
    imageFolder: 'qr-generator',
  },
  {
    title: 'CertiGen PH',
    description: 'A free bulk certificate generator that creates accurate certificates from Word templates and Excel/CSV data.',
    technologies: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Vercel', 'Docxtemplater', 'JSZip', 'SheetJS'],
    liveUrl: 'https://certigenph.vercel.app/',
    githubUrl: '#',
    imageFolder: 'certigenph',
  },
  {
    title: 'PriceList PH',
    description: 'A platform to find and view business dashboards and price lists in the Philippines.',
    technologies: ['React Native', 'Expo', 'TypeScript', 'Tailwind CSS', 'Supabase', 'React Navigation', 'Zustand'],
    liveUrl: 'https://pricelistph.vercel.app/',
    githubUrl: '#',
    imageFolder: 'pricelistph',
  },
  {
    title: 'Onad Motorshop',
    description: 'A website for a premium motorcycle repair, maintenance, and parts fitting shop in Bato, Camarines Sur.',
    technologies: ['Angular', 'TypeScript', 'Tailwind CSS', 'RxJS', 'Vercel'],
    liveUrl: 'https://onadmotorshop.vercel.app/',
    githubUrl: '#',
    imageFolder: 'onadmotorshop',
  },
];
