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
  problem?: string;
  users?: string;
  contribution?: string;
  outcome?: string;
  highlights?: string[];
}

export const portfolioProjects: PortfolioProject[] = [
  {
    title: 'TrackApp',
    description: 'An offline-first cash-flow and float ledger mobile app for digital payment counters and load centers, with multi-wallet tracking, fee calculation, and debtor ledger logging.',
    technologies: ['React Native', 'Expo', 'TypeScript', 'Tailwind CSS', 'SQLite', 'React Navigation', 'Zustand'],
    liveUrl: '#',
    githubUrl: 'https://github.com/Draizen75/TrackApp',
    imageFolder: 'trackapp',
    role: 'Solo Developer',
    duration: '1 Month',
    category: 'Mobile Application',
    problem: 'Small payment counters often track GCash, Maya, cash, service fees, and utang records manually, which makes balance checks and end-of-day reviews slow and error-prone.',
    users: 'Digital payment counter operators, load sellers, and small businesses that need reliable local records even without a stable connection.',
    contribution: 'Designed the local data model, built the transaction flows, implemented wallet balance updates, and created the mobile interface for fast counter use.',
    outcome: 'Produced a usable offline ledger prototype that centralizes wallet movement, service-fee profit, and debtor history in one mobile workflow.',
    highlights: [
      'Implemented an offline-first SQLite schema for fast local transaction entries',
      'Tracked GCash, Maya, and cash-box balances with clear wallet separation',
      'Built debtor statement logs for utang transactions, fee additions, and settlements',
      'Added dynamic service-fee calculations and visual income summaries'
    ]
  },
  {
    title: 'SYD POS',
    description: 'A point-of-sale and inventory management system for handling sales, stock monitoring, billing, and business transaction workflows.',
    technologies: ['React', 'Next.js', 'TypeScript', 'Node.js', 'PostgreSQL', 'Tailwind CSS'],
    liveUrl: 'https://sydpos.biz',
    githubUrl: '#',
    imageFolder: 'sydpos',
    role: 'Full-Stack Developer',
    duration: '4 Months',
    category: 'SaaS / Business Utility',
    problem: 'Retail teams need a dependable way to process transactions, monitor stock, and review business activity without jumping between separate tools.',
    users: 'Cashiers, store owners, and administrators managing sales and inventory operations.',
    contribution: 'Worked on business-facing modules for transactions, inventory views, dashboards, and receipt-oriented workflows using a TypeScript stack.',
    outcome: 'Helped shape a production-style POS experience focused on faster transaction review, clearer stock visibility, and practical admin workflows.',
    highlights: [
      'Built dashboard surfaces for stock alerts and sales visibility',
      'Implemented transaction-history and billing-oriented UI flows',
      'Worked with role-aware access patterns for cashier and admin experiences',
      'Structured responsive interfaces for repeated daily business use'
    ]
  },
  {
    title: 'CertiGen PH',
    description: 'A browser-side bulk certificate generator that creates certificates from Word templates and Excel or CSV data without uploading user files to a database.',
    technologies: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Vercel', 'Docxtemplater', 'JSZip', 'SheetJS'],
    liveUrl: 'https://certigenph.vercel.app/',
    githubUrl: '#',
    imageFolder: 'certigenph',
    role: 'Solo Developer',
    duration: '3 Weeks',
    category: 'Web App Utility',
    problem: 'Schools, organizations, and event teams often prepare certificates one by one, which wastes time and increases the chance of spelling or formatting mistakes.',
    users: 'Teachers, student organizations, event organizers, and offices that generate batches of personalized certificates.',
    contribution: 'Built the template upload flow, spreadsheet parsing, in-browser document generation, and ZIP export experience.',
    outcome: 'Delivered a privacy-friendly utility where certificate batches can be generated locally in the browser with minimal setup.',
    highlights: [
      'Rendered DOCX templates directly in the browser with Docxtemplater',
      'Parsed Excel and CSV rows using SheetJS for bulk personalization',
      'Bundled generated certificates into ZIP files with JSZip',
      'Kept user files client-side to reduce privacy and storage risk'
    ]
  },
  {
    title: 'Duola',
    description: 'A multi-tenant birth support SaaS concept for doula agencies, including branded care journeys, secure messaging, birth plan PDFs, and tenant-aware data boundaries.',
    technologies: ['Next.js', 'TypeScript', 'PostgreSQL', 'Supabase', 'Tailwind CSS', 'Prisma', 'Stripe'],
    liveUrl: 'https://www.birthflowapp.com/',
    githubUrl: '#',
    imageFolder: 'birthflow',
    role: 'Full-Stack Developer',
    duration: '5 Months',
    category: 'Multi-tenant SaaS',
    problem: 'Doula teams need organized client journeys, document generation, and branded communication without mixing tenant data.',
    users: 'Doula agencies, birth workers, and clients following prenatal-to-postpartum care workflows.',
    contribution: 'Worked on tenant-aware application structure, care-flow UI, messaging surfaces, PDF generation, and billing-related integration points.',
    outcome: 'Created a SaaS-style product experience that demonstrates multi-tenant workflow design and healthcare-adjacent privacy awareness.',
    highlights: [
      'Structured tenant-aware data access patterns with Supabase and Prisma',
      'Built birth-plan customization flows with clean PDF export',
      'Implemented messaging-oriented UI for agency-client communication',
      'Connected subscription-oriented product flows with Stripe'
    ]
  },
  {
    title: 'SYD Commerce',
    description: 'A modern e-commerce platform focused on catalog browsing, checkout flow, and maintainable commerce operations.',
    technologies: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Node.js', 'PostgreSQL', 'Prisma'],
    liveUrl: 'https://sydcommerce.com',
    githubUrl: '#',
    imageFolder: 'sydcommerce',
    role: 'Full-Stack Developer',
    duration: '3 Months',
    category: 'E-Commerce Platform',
    problem: 'Online stores need fast product discovery, clear checkout paths, and admin-friendly data structures.',
    users: 'Store customers and business administrators managing products, orders, and checkout operations.',
    contribution: 'Built commerce-facing UI flows and worked with backend data models for products, users, and order-related features.',
    outcome: 'Delivered a responsive commerce experience designed for SEO visibility and practical store management.',
    highlights: [
      'Implemented catalog surfaces with server-rendered SEO considerations',
      'Worked on secure authentication and user-flow patterns',
      'Modeled relational commerce data using Prisma and PostgreSQL',
      'Created responsive checkout and product-browsing interfaces'
    ]
  },
  {
    title: 'Onad Motorshop',
    description: 'A commercial website for a motorcycle repair, maintenance, and parts fitting shop in Bato, Camarines Sur.',
    technologies: ['Angular', 'TypeScript', 'Tailwind CSS', 'RxJS', 'Vercel'],
    liveUrl: 'https://onadmotorshop.vercel.app/',
    githubUrl: '#',
    imageFolder: 'onadmotorshop',
    role: 'Web Developer',
    duration: '1 Month',
    category: 'Commercial Website',
    problem: 'A local repair shop needed a clearer online presence for services, contact paths, and customer trust.',
    users: 'Motorcycle owners looking for repair, maintenance, and parts-fitting services in the local area.',
    contribution: 'Designed and implemented the responsive website, service sections, visual structure, and deployment setup.',
    outcome: 'Published a mobile-friendly business site that makes services easier to inspect and contact actions easier to find.',
    highlights: [
      'Built responsive Angular pages for local service discovery',
      'Organized service and shop information for quick scanning',
      'Optimized static deployment to Vercel',
      'Designed mobile-first contact and navigation paths'
    ]
  },
  {
    title: 'PriceList PH',
    description: 'A platform concept for finding and viewing business dashboards and price lists in the Philippines.',
    technologies: ['React Native', 'Expo', 'TypeScript', 'Tailwind CSS', 'Supabase', 'React Navigation', 'Zustand'],
    liveUrl: 'https://pricelistph.vercel.app/',
    githubUrl: '#',
    imageFolder: 'pricelistph',
    role: 'Mobile App Developer',
    duration: '2 Months',
    category: 'Mobile Application',
    problem: 'Customers and businesses need a simpler way to publish, browse, and update local price-list information.',
    users: 'Local businesses, customers comparing prices, and admins maintaining catalog data.',
    contribution: 'Worked on mobile screens, state management, Supabase-backed data flows, and chart-style summary surfaces.',
    outcome: 'Built a mobile-first product concept for browsing and managing frequently changing price information.',
    highlights: [
      'Created cross-platform screens with Expo and React Native',
      'Managed app state using Zustand',
      'Connected Supabase data flows for catalog updates',
      'Built visual summary components for pricing information'
    ]
  },
  {
    title: 'Portfolio',
    description: 'A responsive developer portfolio featuring a polished UI, project case-study modals, generated assets, and technical SEO foundations.',
    technologies: ['React', 'TypeScript', 'Tailwind CSS', 'Vite', 'CSS Animations'],
    liveUrl: 'https://draizenmartirez.vercel.app/',
    githubUrl: '#',
    imageFolder: 'portfolio',
    role: 'Solo Developer',
    duration: '2 Weeks',
    category: 'Front-end App',
    problem: 'A developer portfolio needs to communicate skill, credibility, and contact paths quickly without feeling like a generic template.',
    users: 'Recruiters, hiring managers, collaborators, and potential clients reviewing technical work.',
    contribution: 'Designed and built the React interface, responsive sections, theme system, project presentation, generated assets, and SEO metadata.',
    outcome: 'Created a production-ready personal site that showcases selected work and supports search/social discovery.',
    highlights: [
      'Built responsive single-page sections with lazy-loaded below-the-fold content',
      'Replaced heavy animation dependencies with CSS and IntersectionObserver reveals',
      'Generated WebP assets, project covers, favicons, sitemap, and Open Graph imagery',
      'Configured structured data, canonical links, and crawler-friendly fallbacks'
    ]
  },
  {
    title: 'QR Code Generator',
    description: 'A simple Flask web app that converts URLs into QR codes instantly.',
    technologies: ['Python', 'Flask', 'HTML/CSS', 'JavaScript', 'PyQRCode', 'Pillow', 'Jinja2'],
    liveUrl: '#',
    githubUrl: '#',
    imageFolder: 'qr-generator',
    role: 'Solo Developer',
    duration: '1 Week',
    category: 'Web Utility',
    problem: 'Users sometimes need a quick no-friction way to turn a URL into a scannable QR code.',
    users: 'Students, small teams, and anyone preparing simple printed or digital URL handoffs.',
    contribution: 'Implemented the Flask routes, QR generation flow, image rendering, and basic responsive UI.',
    outcome: 'Built a compact utility project that demonstrates Python web routing and server-side image generation.',
    highlights: [
      'Created Flask route handlers for QR generation',
      'Generated QR images server-side with Python imaging tools',
      'Built a lightweight HTML/CSS interface',
      'Added basic clipboard-oriented front-end behavior'
    ]
  }
];
