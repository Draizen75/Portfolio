/**
 * Contact Component
 * * Updated with Blue Hover Effects and Scale Animation on icons.
 */

import { useRef } from 'react';
import { socialIcons } from '../../data/inlineIcons.generated';
import { useRevealOnScroll } from '../../hooks/useRevealOnScroll';

interface SocialLink {
  name: string;
  url: string;
  iconType: 'inline';
}

interface BrandSocialLink {
  name: string;
  url: string;
  iconType: 'brand';
  iconKey: keyof typeof socialIcons;
}

type SocialLinkItem = SocialLink | BrandSocialLink;

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const { ref: contentRef, isVisible } = useRevealOnScroll<HTMLDivElement>();


  const emailAddress = 'draizenllaban@gmail.com';
  const phone = '09923630328';
  const address = 'San Miguel, Bato, Camarines Sur, 4435';

  const socialLinks: SocialLinkItem[] = [
    {
      name: 'GitHub',
      url: 'https://github.com/Draizen75',
      iconType: 'brand',
      iconKey: 'github',
    },
    {
      name: 'LinkedIn',
      url: 'https://www.linkedin.com/in/lloydmartirez/',
      iconType: 'inline',
    },
    {
      name: 'Facebook',
      url: 'https://www.facebook.com/lloyddraizen.martirez/',
      iconType: 'brand',
      iconKey: 'facebook',
    },
  ];

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative bg-transparent pb-16 overflow-hidden"
      aria-labelledby="contact-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div
          ref={contentRef}
          className={`reveal-on-scroll ${isVisible ? 'is-visible' : ''}`}
        >

          <div className="text-center mb-12 sm:mb-16">
            <h2 id="contact-heading" className="type-section-title">Get in Touch</h2>
            <p className="type-section-lead px-4">
              Have a project in mind or want to connect? Reach out anytime.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 lg:gap-12 mb-12 sm:mb-16">
            {/* Contact Section */}
            <div className="space-y-4 text-center sm:text-left min-w-0">
              <h2 className="type-subsection-title mb-4">Contact</h2>
              <div className="space-y-3">
                {/* Email */}
                <div className="flex items-start justify-center sm:justify-start gap-3 min-w-0">
                  <svg className="w-6 h-6 text-gray-700 dark:text-gray-300 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <a 
                    href={`mailto:${emailAddress}`}
                    className="type-body hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300 break-all"
                  >
                    {emailAddress}
                  </a>
                </div>
                
                {/* Phone */}
                <div className="flex items-start justify-center sm:justify-start gap-3 min-w-0">
                  <svg className="w-6 h-6 text-gray-700 dark:text-gray-300 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <a 
                    href={`tel:${phone}`}
                    className="type-body hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300"
                  >
                    {phone}
                  </a>
                </div>
              </div>
            </div>

            {/* Address Section */}
            <div className="space-y-4 text-center sm:text-left min-w-0">
              <h2 className="type-subsection-title mb-4">Location</h2>
              <div className="flex items-start justify-center sm:justify-start gap-3 min-w-0">
                <svg className="w-6 h-6 text-gray-700 dark:text-gray-300 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <p className="type-body break-words">{address}</p>
              </div>
            </div>

            {/* Quick Links Section */}
            <div className="space-y-4 text-center sm:text-left">
              <h2 className="type-subsection-title mb-4">Quick Links</h2>
              <div className="space-y-2">
                <a href="#about" className="block type-body hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300">About</a>
                <a href="#skills" className="block type-body hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300">Skills</a>
                <a href="#projects" className="block type-body hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300">Projects</a>
                <a href="#contact" className="block type-body hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300">Contact</a>
              </div>
            </div>

            {/* Say Hello Button & Social Icons Section */}
            <div className="space-y-4 text-center">
              <h2 className="type-subsection-title mb-4">Let's Connect</h2>
              <div>
                <a 
                  href={`mailto:${emailAddress}`} 
                  className="inline-flex w-full sm:w-auto items-center justify-center gap-2 px-6 sm:px-8 py-3.5 sm:py-4 bg-gray-900 text-white dark:bg-white dark:text-slate-900 rounded-lg type-button hover:bg-blue-600 dark:hover:bg-blue-500 hover:text-white dark:hover:text-white transition-all duration-300 shadow-md hover:shadow-lg hover:-translate-y-1"
                >
                  <span>Say Hello</span>
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </a>
              </div>

              <div className="flex justify-center gap-6 sm:gap-8 mt-6 sm:mt-8">
                {socialLinks.map((social) => (
                  <a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Visit ${social.name}`}
                    className="
                      text-gray-500 dark:text-gray-400 
                      hover:text-blue-600 dark:hover:text-blue-400 
                      transition-all duration-300 
                      transform hover:scale-110
                    "
                  >
                    {social.iconType === 'brand' ? (
                      <svg
                        aria-hidden="true"
                        viewBox="0 0 24 24"
                        className="w-9 h-9"
                        fill="currentColor"
                      >
                        <path d={socialIcons[social.iconKey].path} />
                      </svg>
                    ) : (
                      <svg
                        aria-hidden="true"
                        viewBox="0 0 24 24"
                        className="w-9 h-9"
                        fill="currentColor"
                      >
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 114.126 0 2.063 2.063 0 01-2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                      </svg>
                    )}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
