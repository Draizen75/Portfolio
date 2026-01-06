/**
 * Contact Component
 *
 * Displays contact information and social media links.
 * Provides a call-to-action button for email contact.
 */

import { useState, useEffect, useRef, type ComponentType } from 'react';
import * as Icons from 'simple-icons';
import type { SimpleIcon } from 'simple-icons';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

/* -------------------------------------------------------------------------- */
/*                                   Types                                    */
/* -------------------------------------------------------------------------- */

type SocialLink =
  | {
      name: string;
      url: string;
      iconType: 'simple';
      icon: SimpleIcon;
      brandColor: string;
    }
  | {
      name: string;
      url: string;
      iconType: 'react';
      icon: ComponentType<any>;
      brandColor: string;
    };

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  const emailAddress = 'draizenllaban@gmail.com';
  const phone = '09923630328';
  const address = 'San Miguel, Bato, Camarines Sur, 4435';

  /* ------------------------------ Social Links ----------------------------- */

  const socialLinks: SocialLink[] = [
    {
      name: 'GitHub',
      url: 'https://github.com/Draizen75',
      iconType: 'simple',
      icon: Icons.siGithub,
      brandColor: '#181717',
    },
    {
      name: 'LinkedIn',
      url: 'https://www.linkedin.com/in/lloydmartirez/',
      iconType: 'react',
      icon: LinkedInIcon,
      brandColor: '#0A66C2',
    },
    {
      name: 'Facebook',
      url: 'https://www.facebook.com/lloyddraizen.martirez/',
      iconType: 'simple',
      icon: Icons.siFacebook,
      brandColor: '#1877F2',
    },
  ];

  /* --------------------------- Intersection Observer ------------------------ */

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setIsVisible(true);
        });
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);

    return () => {
      if (sectionRef.current) observer.unobserve(sectionRef.current);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="bg-background-primary dark:bg-gray-900 py-6 sm:py-8 md:py-10 relative overflow-hidden"
    >
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 md:px-8 relative z-10">
        <div
          className={`transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          {/* ------------------------------ Grid ------------------------------ */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 md:gap-12 mb-8 sm:mb-12">
            {/* Contact */}
            <div className="space-y-4">
              <h3 className="text-accent-primary font-extrabold text-lg sm:text-xl md:text-2xl tracking-tight">
                Contact
              </h3>

              {/* Email */}
              <div className="flex items-start gap-3">
                <svg
                  className="w-5 h-5 text-text-secondary dark:text-gray-300 mt-0.5 flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
                <a
                  href={`mailto:${emailAddress}`}
                  className="text-text-secondary dark:text-gray-200 hover:text-accent-primary transition-colors duration-300 break-all text-sm sm:text-base"
                >
                  {emailAddress}
                </a>
              </div>

              {/* Phone */}
              <div className="flex items-start gap-3">
                <svg
                  className="w-5 h-5 text-text-secondary dark:text-gray-300 mt-0.5 flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>
                <a
                  href={`tel:${phone}`}
                  className="text-text-secondary dark:text-gray-200 hover:text-accent-primary transition-colors duration-300 text-sm sm:text-base"
                >
                  {phone}
                </a>
              </div>
            </div>

            {/* Location */}
            <div className="space-y-4">
              <h3 className="text-accent-primary font-extrabold text-lg sm:text-xl md:text-2xl tracking-tight">
                Location
              </h3>
              <div className="flex items-start gap-3">
                <svg
                  className="w-5 h-5 text-text-secondary dark:text-gray-300 mt-0.5 flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                <p className="text-text-secondary dark:text-gray-200 text-sm sm:text-base break-words">
                  {address}
                </p>
              </div>
            </div>

            {/* Quick Links */}
            <div className="space-y-4">
              <h3 className="text-accent-primary font-extrabold text-lg sm:text-xl md:text-2xl tracking-tight">
                Quick Links
              </h3>
              <div className="space-y-2 sm:space-y-3">
                <a href="#about" className="block text-text-secondary dark:text-gray-200 hover:text-accent-primary transition-colors duration-300 text-sm sm:text-base">About</a>
                <a href="#skills" className="block text-text-secondary dark:text-gray-200 hover:text-accent-primary transition-colors duration-300 text-sm sm:text-base">Skills</a>
                <a href="#projects" className="block text-text-secondary dark:text-gray-200 hover:text-accent-primary transition-colors duration-300 text-sm sm:text-base">Projects</a>
                <a href="#contact" className="block text-text-secondary dark:text-gray-200 hover:text-accent-primary transition-colors duration-300 text-sm sm:text-base">Contact</a>
              </div>
            </div>

            {/* CTA */}
            <div className="space-y-4">
              <h3 className="text-accent-primary font-extrabold text-lg sm:text-xl md:text-2xl tracking-tight">
                Let's Connect
              </h3>
              <a
                href={`mailto:${emailAddress}`}
                className="group inline-flex items-center justify-center gap-3 w-full px-8 py-4 bg-accent-primary text-white text-base sm:text-lg font-semibold rounded-xl transition-all duration-300 hover:bg-accent-hover"
              >
                Say Hello
              </a>
            </div>
          </div>

          {/* -------------------------- Social Icons ---------------------------- */}
          <div className="flex justify-center gap-4 sm:gap-5 md:gap-6">
            {socialLinks.map((social) => (
              <a
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Visit ${social.name}`}
                className={`group flex items-center justify-center w-6 h-6 rounded-xl
                           bg-background-secondary dark:bg-gray-800
                           transition-all duration-300 hover:scale-110
                           ${social.name === 'GitHub' ? 'github-social' : ''}`}
                style={{ ['--brand-color' as any]: social.brandColor }}
              >
                {social.iconType === 'react' ? (
                  <social.icon
                    className="w-5 h-5 transition-colors duration-300"
                    style={{ color: 'currentColor' }}
                  />
                ) : (
                  <svg
                    role="img"
                    viewBox="0 0 24 24"
                    className="w-5 h-5 transition-colors duration-300"
                    style={{ fill: 'currentColor' }}
                  >
                    <title>{social.icon.title}</title>
                    <path d={social.icon.path} />
                  </svg>
                )}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* ----------------------- Brand Hover Styles ------------------------ */}
      <style>{`
        .group:hover {
          color: var(--brand-color);
          background-color: color-mix(in srgb, var(--brand-color) 12%, transparent);
        }
        
        /* GitHub hover blue in both light and dark mode */
        .github-social:hover {
          color: #3b82f6 !important;
          background-color: color-mix(in srgb, #3b82f6 12%, transparent) !important;
        }
      `}</style>
    </section>
  );
}
