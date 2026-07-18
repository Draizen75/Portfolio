import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { initGoogleAnalytics } from './utils/analytics'

/**
 * Defers analytics until interaction or a late fallback so it does not compete with LCP.
 */
const deferAnalytics = (): void => {
  let didInit = false;
  let fallbackId = 0;

  const initOnce = (): void => {
    if (didInit) {
      return;
    }

    didInit = true;
    window.clearTimeout(fallbackId);
    window.removeEventListener('pointerdown', initOnce);
    window.removeEventListener('keydown', initOnce);
    window.removeEventListener('touchstart', initOnce);
    document.removeEventListener('visibilitychange', handleVisibilityChange);
    initGoogleAnalytics();
  };

  const handleVisibilityChange = (): void => {
    if (document.visibilityState === 'hidden') {
      initOnce();
    }
  };

  window.addEventListener('pointerdown', initOnce, { once: true, passive: true });
  window.addEventListener('keydown', initOnce, { once: true });
  window.addEventListener('touchstart', initOnce, { once: true, passive: true });
  document.addEventListener('visibilitychange', handleVisibilityChange);
  fallbackId = window.setTimeout(initOnce, 10000);
};

deferAnalytics();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
