/**
 * Google Analytics Utility
 * Initializes Google Analytics 4 (GA4) if the measurement ID is provided in environment variables.
 */

declare global {
  interface Window {
    dataLayer: any[];
    gtag: (...args: any[]) => void;
  }
}

export const initGoogleAnalytics = () => {
  const gaId = import.meta.env.VITE_GOOGLE_ANALYTICS_ID;

  if (gaId) {
    // Create the script tag for the GA library
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${gaId}`;
    document.head.appendChild(script);

    // Initialize the dataLayer and gtag function
    window.dataLayer = window.dataLayer || [];
    window.gtag = function() {
      window.dataLayer.push(arguments);
    };

    window.gtag('js', new Date());
    window.gtag('config', gaId);

    console.log(`Google Analytics initialized with ID: ${gaId}`);
  } else {
    console.log('Google Analytics ID not found in environment variables.');
  }
};
