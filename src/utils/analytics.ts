/**
 * Google Analytics Utility
 * Initializes Google Analytics 4 (GA4) if the measurement ID is provided in environment variables.
 */

type GtagCommand = 'config' | 'event' | 'js' | 'set';

declare global {
  interface Window {
    dataLayer: unknown[];
    gtag: (command: GtagCommand | string, ...args: unknown[]) => void;
  }
}

/**
 * Initializes Google Analytics when a measurement ID is configured.
 */
export const initGoogleAnalytics = (): void => {
  const gaId = import.meta.env.VITE_GOOGLE_ANALYTICS_ID;

  if (gaId) {
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${gaId}`;
    document.head.appendChild(script);

    window.dataLayer = window.dataLayer || [];
    window.gtag = (...args: unknown[]) => {
      window.dataLayer.push(args);
    };

    window.gtag('js', new Date());
    window.gtag('config', gaId);

    console.log(`Google Analytics initialized with ID: ${gaId}`);
  } else {
    console.log('Google Analytics ID not found in environment variables.');
  }
};
