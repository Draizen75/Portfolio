import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { initGoogleAnalytics } from './utils/analytics'

/**
 * Defers analytics initialization until the browser is idle to avoid blocking first paint.
 */
const deferAnalytics = (): void => {
  const scheduleInit = window.requestIdleCallback ?? ((callback: IdleRequestCallback) => {
    return window.setTimeout(() => callback({ didTimeout: false, timeRemaining: () => 0 }), 2000);
  });

  scheduleInit(() => initGoogleAnalytics());
};

deferAnalytics();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
