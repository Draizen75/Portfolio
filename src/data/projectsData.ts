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
  role?: string;
  duration?: string;
  category?: string;
  highlights?: string[];
}

export const portfolioProjects: PortfolioProject[] = [
  {
    title: 'TrackApp',
    description: 'A comprehensive, offline-first personal and commercial cash-flow float ledger mobile application tailored for digital payment counters and load centers, featuring multi-wallet management, instant profit fee calculation, and debtor ledger logging.',
    technologies: ['React Native', 'Expo', 'TypeScript', 'Tailwind CSS', 'SQLite', 'React Navigation', 'Zustand'],
    liveUrl: '#',
    githubUrl: 'https://github.com/Draizen75/TrackApp',
    imageFolder: 'trackapp',
    duration: '1 Month',
    category: 'Mobile Application',
    highlights: [
      'Engineered offline-first SQLite database schema supporting rapid local ledger transaction entries',
      'Integrated float wallet balances (GCash, Maya, Cash Box) with color-coded allocation distributions',
      'Designed debtor Utang statement logs showing historical transactions, fee additions, and settlements',
      'Built automated dynamic percentage-based service fee profit calculators with 7-day visual gross income charts'
    ]
  },
  {
    title: 'Portfolio',
    description: 'A modern, responsive developer portfolio featuring a dynamic UI, horizontal swipe layouts, and optimized performance.',
    technologies: ['React', 'TypeScript', 'Tailwind CSS', 'Vite', 'CSS Animations'],
    liveUrl: 'https://draizenmartirez.vercel.app/',
    githubUrl: '#',
    imageFolder: 'portfolio',
    role: 'Solo Developer',
    duration: '2 Weeks',
    category: 'Front-end App',
    highlights: [
      'Built interactive global canvas particle backgrounds',
      'Replaced animation-library transitions with lightweight CSS and IntersectionObserver reveals',
      'Configured responsive capsule navigation overlays',
      'Tuned SEO-ready sitemaps, JSON-LD structured data, and Open Graph metadata'
    ]
  },
  {
    title: 'Onad Motorshop',
    description: 'A website for a premium motorcycle repair, maintenance, and parts fitting shop in Bato, Camarines Sur.',
    technologies: ['Angular', 'TypeScript', 'Tailwind CSS', 'RxJS', 'Vercel'],
    liveUrl: 'https://onadmotorshop.vercel.app/',
    githubUrl: '#',
    imageFolder: 'onadmotorshop',
    role: 'Full-stack Developer',
    duration: '1 Month',
    category: 'Commercial Website',
    highlights: [
      'Designed interactive scheduling calendars for motorcycle repair check-ins',
      'Structured catalog navigation for search and fitment checking',
      'Optimized asset loading speeds on mobile networks',
      'Deployed static cloud compilation to Vercel production edge'
    ]
  },
  {
    title: 'SYD Commerce',
    description: 'A modern e-commerce platform with a focus on user experience and performance.',
    technologies: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Node.js', 'PostgreSQL', 'Prisma'],
    liveUrl: 'https://sydcommerce.com',
    githubUrl: '#',
    imageFolder: 'sydcommerce',
    role: 'Lead Developer',
    duration: '3 Months',
    category: 'E-Commerce Platform',
    highlights: [
      'Configured server-side rendering (SSR) for optimal SEO catalog index scoring',
      'Integrated Stripe card token checkout streams',
      'Wired secure JSON Web Token user authorization flows',
      'Constructed database relations using Prisma and PostgreSQL'
    ]
  },
  {
    title: 'SYD POS',
    description: 'A comprehensive Point of Sale system for managing sales, inventory, and transactions.',
    technologies: ['React', 'Next.js', 'TypeScript', 'Node.js', 'PostgreSQL', 'Tailwind CSS'],
    liveUrl: 'https://sydpos.biz',
    githubUrl: '#',
    imageFolder: 'sydpos',
    role: 'Full-stack Architect',
    duration: '4 Months',
    category: 'SaaS / Business Utility',
    highlights: [
      'Created real-time visual dashboards tracking stock alerts',
      'Wired automated PDF billing receipt generation processes',
      'Secured role-based access control (RBAC) levels for cashiers and admins',
      'Designed local offline transaction sync protocols'
    ]
  },
  {
    title: 'Duola',
    description: 'A multi-tenant birth support SaaS for doula agencies - automated prenatal-to-postpartum care journeys, white-label branding, secure messaging, birth plan PDFs, and HIPAA-ready tenant isolation.',
    technologies: ['Next.js', 'TypeScript', 'PostgreSQL', 'Supabase', 'Tailwind CSS', 'Prisma', 'Stripe'],
    liveUrl: 'https://www.birthflowapp.com/',
    githubUrl: '#',
    imageFolder: 'birthflow',
    role: 'Lead Architect',
    duration: '5 Months',
    category: 'Multi-tenant SaaS',
    highlights: [
      'Constructed secure row-level security (RLS) data schemas in Supabase',
      'Engineered birth plan customization engine exporting clean PDFs',
      'Structured live chat channels connecting doulas and clients',
      'Configured Stripe billing streams managing tenant subscriptions'
    ]
  },
  {
    title: 'CertiGen PH',
    description: 'A free bulk certificate generator that creates accurate certificates from Word templates and Excel/CSV data.',
    technologies: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Vercel', 'Docxtemplater', 'JSZip', 'SheetJS'],
    liveUrl: 'https://certigenph.vercel.app/',
    githubUrl: '#',
    imageFolder: 'certigenph',
    role: 'Solo Developer',
    duration: '3 Weeks',
    category: 'Web App Utility',
    highlights: [
      'Built fully browser-side Docx document template rendering mechanics',
      'Parsed client-provided Excel tables using SheetJS arrays',
      'Bundled compressed batch zip files in-memory using JSZip streams',
      'Ensured absolute data privacy by computing everything without database logs'
    ]
  },
  {
    title: 'PriceList PH',
    description: 'A platform to find and view business dashboards and price lists in the Philippines.',
    technologies: ['React Native', 'Expo', 'TypeScript', 'Tailwind CSS', 'Supabase', 'React Navigation', 'Zustand'],
    liveUrl: 'https://pricelistph.vercel.app/',
    githubUrl: '#',
    imageFolder: 'pricelistph',
    role: 'Lead Developer',
    duration: '2 Months',
    category: 'Mobile Application',
    highlights: [
      'Optimized smooth native screens loading cross-platform using Expo SDKs',
      'Maintained Zustand global state hooks syncing catalog modifications',
      'Integrated interactive canvas chart summaries using React Native SVG paths',
      'Configured Supabase real-time triggers broadcasting cost shifts'
    ]
  },
  {
    title: 'QR Code Generator',
    description: 'A simple web app to convert URLs into QR codes instantly.',
    technologies: ['Python', 'Flask', 'HTML/CSS', 'JavaScript', 'PyQRCode', 'Pillow', 'Jinja2'],
    liveUrl: '#',
    githubUrl: '#',
    imageFolder: 'qr-generator',
    role: 'Solo Developer',
    duration: '1 Week',
    category: 'Web Utility',
    highlights: [
      'Wired responsive minimal Python Flask web routing handlers',
      'Generated QR image grids on the server using Pillow draw brushes',
      'Developed basic front-end layout utilizing native Flexbox arrays',
      'Wired client copy buttons to clipboard triggers'
    ]
  }
];
